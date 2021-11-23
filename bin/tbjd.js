#!/usr/bin/env node
const program = require('commander');
//插件加载及执行逻辑
const transform = require('./transform');
//初始化插件项目逻辑
const init = require('./init');
const pkg = require('../package.json');
const { info } = require('../lib/message');

program
  .command('init')
  .description('初始化一个插件项目')
  .action((name) => {
    init(name);
  })

// 配置options
program
  .command('transform')
  .option('-n, --name <name>', '项目名')
  .option('-t, --tag <s/b>', 's/b端')
  .option('-o, --out <path>', '输出文件路径')
  .option('-s, --src <path>', '需要转换的源文件路径')
  .action((options) => {
      return transform(options);
  });

// 配置 cli 信息，版本、cli说明等
program
  .version(pkg.version)
  .description(info('京东小工具'));

// 接管命令行输入，参数处理
program
  .parse(process.argv);
