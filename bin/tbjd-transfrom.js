#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const download = require('../lib/download');
const message = require('../lib/message');

program
  .option('-t, --test', 'test project')
  .usage('初始化项目')
  .parse(process.argv);

if (program.test) {
  console.log(program.opts());
  process.exit(0);
}

// 根据输入，获取项目名称
let projectName = program.args[0];
if (!projectName) {
  // 输出帮助信息的同时不退出
  program.outputHelp();
  process.exit(1);
}

init();

async function init() {
  const list = fs.readdirSync(process.cwd());
  const rootName = path.basename(process.cwd()); // 当前目录名称

  // 如果当前目录不为空，且存在与projectName同名的目录，则提示项目已经存在，结束命令执行
  if (list.length) {
    if (
      list.some(name => {
        const fileName = path.join(process.cwd(), name);
        const isDir = fs.statSync(fileName).isDirectory();
        return name === projectName && isDir;
      })
    ) {
      message.error(`项目${projectName}已经存在`);
      process.exit(1);
    }
  }
  // 如果当前目录是空的，并且当前目录名称和项目名称相同，那么就通过终端交互的方式确认是否直接在当前目录下创建项目，否则，在当前目录下创建以projectName作为名称的目录作为工程的根目录
  else if (rootName === projectName) {
    const answers = await inquirer.prompt([
      {
        name: 'buildInCurrent',
        message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
        type: 'confirm',
        default: true,
      },
    ]);
    if (answers.buildInCurrent) {
      projectName = '.';
    }
  }
  go();
}

async function go() {
  try {
    if (projectName !== '.') {
      fs.mkdirSync(projectName);
    }
    // 下载完成后，再将临时下载目录中的项目模板文件复制到项目目录中
    const downloadDir = await download('sunmnet/data_governance');

    // 下载完成后，提示用户输入新项目信息，可以输入 项目的名称、项目的版本号、项目的简介
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'toBeDelivered',
        message: 'Is this for delivery (NO)?',
        default: false,
      },
      {
        type: 'list', // rawlist
        name: 'size',
        message: 'What size do you need?',
        choices: [
          'Jumbo',
          'Large',
          new inquirer.Separator(' = 分隔器 = '),
          { name: 'Small', value: 1 },
          { name: 'Olives', disabled: 'why disabled' },
        ],
        when(answers) {
          return answers.toBeDelivered === false;
        },
        // 接收用户输入并返回过滤后的值到Answers中
        filter(val) {
          return val.toLowerCase();
        },
      },
      {
        type: 'checkbox',
        message: 'Select toppings',
        name: 'toppings',
        choices: [
          {
            name: 'Ham',
            checked: true,
          },
          {
            name: 'Mozzarella',
          },
        ],
      },
      {
        type: 'input',
        name: 'phone',
        message: "What's your phone number",
        default: 'Doe',
        validate(value) {
          const pass = value.match(
            /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i,
          );
          if (pass) {
            return true;
          }
          return 'Please enter a valid phone number';
        },
      },
      {
        type: 'password',
        message: 'Enter a masked password',
        name: 'password2',
        mask: '*',
      },
    ]);

    console.log(answers);
    // 实现脚手架给模板插值的功能  lib/generator.js

    message.success('创建成功');
    process.exit(0);
  } catch (err) {
    message.error(`创建失败：${err}`);
    process.exit(1);
  }
}