const fs = require('fs');
const { copy, isDirectory, doTemplate } = require('../lib/copyUtils');
const { error } = require('../lib/message')
const { FILE_TYPE_ERROR, SOURCE_PATH_ERROR, OUTFILE_PATH_ERROR, COQY_FILE_ERROR } = require('../lib/errorCode');
const pwd = process.env.PWD;
/**
 * 
 * @param {name, tag, src, out} options 
 */
module.exports = async function(options) {
  // 不传输出地址默认为当前文件夹
  const { src, out = pwd, name, tag } = options;
  // 校验
  if (!src) return error(SOURCE_PATH_ERROR)
  if (!out) return error(OUTFILE_PATH_ERROR)
  if (!await isDirectory(out)) return error(FILE_TYPE_ERROR)

  // 拷贝文件main b端需要重新修改
  copy(src, `${pwd}/outbound/main.js`, err => {
    if (err) return error(COQY_FILE_ERROR)
    doTemplate({ name, tag, tablename: name, src })
  });

  const routerString = 
  console.log(out, src);
};

