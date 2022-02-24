#!/usr/bin/env node

// 引入 yargs 构造函数
const yargs = require('yargs/yargs')

const pkg = require("../package.json");

const dedent = require("dedent")

const argv = process.argv.slice(2)

const context = {
  testVersion: pkg.version,
};



const cli = yargs()

// 调用 yargs 构造函数 传入一个参数进行解析  然后调用 argv  完成初始化过程
cli
  .usage("Usage:test-cli [command] <options>")
  .demandCommand(1, "A command is required. Pass --help to see all available commands and options.") // 设置最少需要输入的 command 的数量
  .recommendCommands()
  .fail((err, msg) => {
    if (err.indexOf('Unknown argument')) {
      console.log('有病啊');
    }
  })
  .strict() // 开启严格模式 命令错误时 会出现 Unknown argument: xxx 的提示
  .alias("h", "help")
  .alias("v", "version")
  .wrap(cli.terminalWidth())
  .epilogue(dedent(`
      When a command fails, all logs are written to lerna-debug.log in the current working directory.

      For more information, find our manual at https://github.com/lerna/lerna


end...
  `))
  .options({
    debug: {
      type: 'boolean',
      describe: "bootstrap debug moe中文如何",
      alias: "d"
    }
  })
  .option("registry", {
    type: 'string',
    describe: "define global registry",
    alias: "r"
  })
  .group(['debug'], 'Deb Options:')
  .group(['registry'], 'Publish Options:')
  .command(
    "init [name]",
    "do init a project",
    (yargs) => {
      yargs.option("name", {
        type: "string",
        describe: 'name of a project',
        alias: "n"
      })
    },
    (argv) => {
      console.log('🚀🚀~ argv:', argv);
    }
  )
  .command({
    command: "list",
    aliases: ["ls", "la", "ll"],
    describe: "List local packages",
    builder: (yargs) => { },
    handler: (argv) => {
      console.log('🚀🚀~ argv:', argv);
    }
  })
  .parse(argv, context)


