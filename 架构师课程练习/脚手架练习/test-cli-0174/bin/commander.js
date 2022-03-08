#!/usr/bin/env node

const commander = require('commander');

const pkg = require('../package.json');

// 获取 commander 脚手架单例
// const { program } = commander;

// 手动创建新的 commander 实例
const program = new commander.Command();

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command>[options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式?', true)
  .option('-e, --envName <envName>', '获取环境变量名称');

// 打印出命令的 options

// 方法一 command 注册命令

const clone = program.command('clone <source> [destination]');
clone
  .description('克隆一个仓库')
  .option('-f, --force', '是否强制克隆') // 注册 clone 命令下的 option
  .action((source, destination, cmdObj) => {
    console.log('do clone', source, destination, cmdObj);
  });

// 方法二 addCommand 注册命令

const service = new commander.Command('service').description('启动一个服务');

service
  .command('start [port]')
  .description('启动服务')
  .action((port) => {
    console.log(`服务启动于${port}`);
  });

service
  .command('stop')
  .description('停止服务')
  .action(() => {
    console.log('服务停止了');
  });

program.addCommand(service);

// 自动安自动寻找包名并执行  脚手架名称 + install 包  ,用于脚手架之间互相调用
program
  .command('install [name]', 'install package', {
    executableFile: 'hzw-cli-dev', // 切换要启动的包名
    isDefault: true, // 默认执行这个命令
    hidden: false, // 隐藏命令
  })
  .alias('i');

// 匹配所有命令
// program
//   .arguments('<cmd> [option]')
//   .description('友情提示:', {
//     cmd: '要有一个必须的命令',
//     option: '有一个可选的参数',
//   })
//   .action((cmd, option) => {
//     console.log(cmd, option);
//   });

// 高级定制 自定义 help 信息

// program.helpInformation = function () {
//   return '';
// };

// program.on('--help', function () {
//   console.log('我是帮助信息');
// });

// 高级定制 实现 debug 模式

// program.on('option:debug', () => {
//   console.log('开启debug模式');
//   if (program._optionValues.debug) {
//     process.env.LOG_LEVEL = 'verbose';
//   }
//   console.log(process.env.LOG_LEVEL);
// });

// 高级定制  对所有未知命令监听

// program.on('command:*', (obj) => {
//   // console.log(obj);
//   // console.log('未知的命令');
//   const commands = program.commands.map((command) => command.name());
//   console.log(`可用命令为${commands.join(',')}`);
// });

program.parse(process.argv);
