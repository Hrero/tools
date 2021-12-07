#!/usr/bin/env node
const program = require('commander');
//初始化插件项目逻辑
const init = require('./init');
const table = require('./table');
const pkg = require('../package.json');
const { info } = require('../lib/message');


// 配置options
program
  .command('init')
  .description('初始化一个京东小项目')
  .option('-n, --name <name>', '项目名')
  .option('-t, --tag <s/b>', 's/b端')
  .option('-e, --env <test/online>', '环境')
  .option('-o, --out <path>', '输出文件路径')
  .option('-s, --src <path>', '需要转换的源文件路径')
  .action((options) => {
      return init(options);
  });

// 配置options
program
  .command('table')
  .description('自动建京东小项目库表')
  .option('-n, --database <database>', '库名')
  .option('-k, --key <key>', '验证key')
  .option('-s, --secret <secret>', '验证密钥')
  .option('-e, --env <test/online>', '环境')
  .action((options) => {
      return table(options);
  });


// 配置 cli 信息，版本、cli说明等
program
  .version(pkg.version)
  .description(info('京东小工具'));

// 接管命令行输入，参数处理
program
  .parse(process.argv);
