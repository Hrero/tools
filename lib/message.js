const term = require('terminal-kit').terminal;

// bold -使文字加粗
// italic-将文字设为斜体（不被广泛支持）
// underline-使文字加下划线（不被广泛支持）

// chalk.blue.bgRed.bold.underline('Hello world!')
// chalk.bold.rgb(10, 100, 200).bgRgb(15, 100, 204)('Hello!')

exports.success = str => {
  // 成功用绿色显示，给出积极的反馈
  term.green(`${str}'\n'`);
};

exports.error = str => {
  // 失败了用红色，增强提示
  term.red(`${str}'\n'`);
};

exports.info = str => {
  term.blue(`${str}'\n'`);
};

exports.warning = str => {
  term.magenta(`${str}'\n'`);
};