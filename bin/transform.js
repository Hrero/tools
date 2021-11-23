const fs = require('fs');
const { copy, isDirectory } = require('../lib/copy');
const { error } = require('../lib/message')
const { FILE_TYPE_ERROR, SOURCE_PATH_ERROR, OUTFILE_PATH_ERROR, COQY_FILE_ERROR } = require('../lib/errorCode');
const pwd = process.env.PWD;
/**
 * 
 * @param {name, tag, src, out} options 
 */
module.exports = async function(options) {
  // 不传输出地址默认为当前文件夹
  const { src, out = pwd } = options;
  // 校验
  if (!src) return error(SOURCE_PATH_ERROR)
  if (!out) return error(OUTFILE_PATH_ERROR)
  if (!await isDirectory(out)) return error(FILE_TYPE_ERROR)

  // 拷贝文件main
  copy(src, `${pwd}/outbound/main.js`, err => {
    if (err) {
        error(COQY_FILE_ERROR);
    }
  });

  const routerString = 
  console.log(out, src);
};

