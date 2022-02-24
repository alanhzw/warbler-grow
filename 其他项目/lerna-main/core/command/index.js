"use strict";

const cloneDeep = require("clone-deep");
const dedent = require("dedent");
const execa = require("execa");
const log = require("npmlog");
const os = require("os");

const { PackageGraph } = require("@lerna/package-graph");
const { Project } = require("@lerna/project");
const { writeLogFile } = require("@lerna/write-log-file");
const { ValidationError } = require("@lerna/validation-error");

const { cleanStack } = require("./lib/clean-stack");
const { defaultOptions } = require("./lib/default-options");
const { logPackageError } = require("./lib/log-package-error");
const { warnIfHanging } = require("./lib/warn-if-hanging");

const DEFAULT_CONCURRENCY = os.cpus().length;

class Command {
  constructor(_argv) {
    // 深拷贝 argv
    const argv = cloneDeep(_argv);
    // 添加 name 属性  FooCommand => foo
    this.name = this.constructor.name.replace(/Command$/, "").toLowerCase();
    // 添加 composed 属性, 是否使用复合指令
    this.composed = typeof argv.composed === "string" && argv.composed !== this.name;
    // 如果不是复合指令
    if (!this.composed) {
      // composed commands have already logged the lerna version
      log.notice("cli", `v${argv.lernaVersion}`);
    }
    // 最终的执行过程
    let runner = new Promise((resolve, reject) => {
      // 定义一个微任务 chain.then 会被加入到微任务队列
      let chain = Promise.resolve();
      // 会行程队列,一个接一个执行
      chain = chain.then(() => {
        this.project = new Project(argv.cwd);
      });
      chain = chain.then(() => this.configureEnvironment());
      chain = chain.then(() => this.configureOptions());
      chain = chain.then(() => this.configureProperties());
      chain = chain.then(() => this.configureLogging());
      chain = chain.then(() => this.runValidations());
      chain = chain.then(() => this.runPreparations());
      // 核心内容
      chain = chain.then(() => this.runCommand());

      chain.then(
        (result) => {
          warnIfHanging();

          resolve(result);
        },
        (err) => {
          if (err.pkg) {
            // Cleanly log specific package error details
            logPackageError(err, this.options.stream);
          } else if (err.name !== "ValidationError") {
            // npmlog does some funny stuff to the stack by default,
            // so pass it directly to avoid duplication.
            log.error("", cleanStack(err, this.constructor.name));
          }

          // ValidationError does not trigger a log dump, nor do external package errors
          if (err.name !== "ValidationError" && !err.pkg) {
            writeLogFile(this.project.rootPath);
          }

          warnIfHanging();

          // error code is handled by cli.fail()
          reject(err);
        }
      );
    });

    if (argv.onResolved || argv.onRejected) {
      runner = runner.then(argv.onResolved, argv.onRejected);

      // when nested, never resolve inner with outer callbacks
      delete argv.onResolved; // eslint-disable-line no-param-reassign
      delete argv.onRejected; // eslint-disable-line no-param-reassign
    }

    // 向 argv 中定义 cwd 和 $0 两个参数
    for (const key of ["cwd", "$0"]) {
      Object.defineProperty(argv, key, { enumerable: false });
    }
    // 对 argv 属性做一些处理
    Object.defineProperty(this, "argv", {
      value: Object.freeze(argv),
    });
    // 对 runner 属性做一些处理
    Object.defineProperty(this, "runner", {
      value: runner,
    });
  }

  then(onResolved, onRejected) {
    return this.runner.then(onResolved, onRejected);
  }

  catch(onRejected) {
    return this.runner.catch(onRejected);
  }

  get requiresGit() {
    return true;
  }

  // Override this to inherit config from another command.
  // For example `changed` inherits config from `publish`.
  get otherCommandConfigs() {
    return [];
  }

  configureEnvironment() {
    // eslint-disable-next-line global-require
    const ci = require("is-ci");
    let loglevel;
    let progress;

    /* istanbul ignore next */
    if (ci || !process.stderr.isTTY) {
      log.disableColor();
      progress = false;
    } else if (!process.stdout.isTTY) {
      // stdout is being piped, don't log non-errors or progress bars
      progress = false;
      loglevel = "error";
    } else if (process.stderr.isTTY) {
      log.enableColor();
      log.enableUnicode();
    }

    Object.defineProperty(this, "envDefaults", {
      value: {
        ci,
        progress,
        loglevel,
      },
    });
  }

  configureOptions() {
    // Command config object normalized to "command" namespace
    const commandConfig = this.project.config.command || {};

    // The current command always overrides otherCommandConfigs
    const overrides = [this.name, ...this.otherCommandConfigs].map((key) => commandConfig[key]);

    this.options = defaultOptions(
      // CLI flags, which if defined overrule subsequent values
      this.argv,
      // Namespaced command options from `lerna.json`
      ...overrides,
      // Global options from `lerna.json`
      this.project.config,
      // Environmental defaults prepared in previous step
      this.envDefaults
    );
  }

  configureProperties() {
    const { concurrency, sort, maxBuffer } = this.options;

    this.concurrency = Math.max(1, +concurrency || DEFAULT_CONCURRENCY);
    this.toposort = sort === undefined || sort;

    /** @type {import("@lerna/child-process").ExecOpts} */
    this.execOpts = {
      cwd: this.project.rootPath,
      maxBuffer,
    };
  }

  configureLogging() {
    const { loglevel } = this.options;

    if (loglevel) {
      log.level = loglevel;
    }

    // handle log.success()
    log.addLevel("success", 3001, { fg: "green", bold: true });

    // create logger that subclasses use
    Object.defineProperty(this, "logger", {
      value: log.newGroup(this.name),
    });

    // emit all buffered logs at configured level and higher
    log.resume();
  }

  enableProgressBar() {
    /* istanbul ignore next */
    if (this.options.progress !== false) {
      log.enableProgress();
    }
  }

  gitInitialized() {
    const opts = {
      cwd: this.project.rootPath,
      // don't throw, just want boolean
      reject: false,
      // only return code, no stdio needed
      stdio: "ignore",
    };

    return execa.sync("git", ["rev-parse"], opts).exitCode === 0;
  }

  runValidations() {
    if ((this.options.since !== undefined || this.requiresGit) && !this.gitInitialized()) {
      throw new ValidationError("ENOGIT", "The git binary was not found, or this is not a git repository.");
    }

    if (!this.project.manifest) {
      throw new ValidationError("ENOPKG", "`package.json` does not exist, have you run `lerna init`?");
    }

    if (!this.project.version) {
      throw new ValidationError("ENOLERNA", "`lerna.json` does not exist, have you run `lerna init`?");
    }

    if (this.options.independent && !this.project.isIndependent()) {
      throw new ValidationError(
        "EVERSIONMODE",
        dedent`
          You ran lerna with --independent or -i, but the repository is not set to independent mode.
          To use independent mode you need to set lerna.json's "version" property to "independent".
          Then you won't need to pass the --independent or -i flags.
        `
      );
    }
  }

  runPreparations() {
    if (!this.composed && this.project.isIndependent()) {
      // composed commands have already logged the independent status
      log.info("versioning", "independent");
    }

    if (!this.composed && this.options.ci) {
      log.info("ci", "enabled");
    }

    let chain = Promise.resolve();

    chain = chain.then(() => this.project.getPackages());
    chain = chain.then((packages) => {
      this.packageGraph = new PackageGraph(packages);
    });

    return chain;
  }

  runCommand() {
    return Promise.resolve()
      .then(() => this.initialize())
      .then((proceed) => {
        if (proceed !== false) {
          return this.execute();
        }
        // early exits set their own exitCode (if non-zero)
      });
  }

  initialize() {
    throw new ValidationError(this.name, "initialize() needs to be implemented.");
  }

  execute() {
    throw new ValidationError(this.name, "execute() needs to be implemented.");
  }
}

module.exports.Command = Command;
