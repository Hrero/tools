const fs = require('fs');
const { copy, isDirectory, doTemplate } = require('../lib/copyUtils');
const { error, success } = require('../lib/message')
const { FILE_TYPE_ERROR, SOURCE_PATH_ERROR, OUTFILE_PATH_ERROR, PROJECT_NAME_ERROR, PROJECT_TYPE_ERROR, SYSTEM_ERROR, CREATE_FILE_ERROR, ENV_DEFINE_ERROR } = require('../lib/errorCode');
const { createFiles } = require('../lib/doProduce')

const { MAIN_OUTBOUND_URL, CREATE_OUTBOUND_URL } = require('../lib/finalUrl');

/**
 * 
 * @param {name, tag, src, out} options 
 */
module.exports = async function(options) {
  // 不传输出地址默认为当前文件夹
  const { src, out = pwd, name, tag, env } = options;
  // 校验
  if (!src) return error(SOURCE_PATH_ERROR)
  if (!out) return error(OUTFILE_PATH_ERROR)
  if (!name) return error(PROJECT_NAME_ERROR)
  if (!tag) return error(PROJECT_TYPE_ERROR)
  if (!env) return error(ENV_DEFINE_ERROR)
  if (!await isDirectory(out)) return error(FILE_TYPE_ERROR)
  // 拷贝文件main b端需要重新修改
  copy(src, MAIN_OUTBOUND_URL, async err => {
    if (err) return error(err)
    // 模版替换
    if (!await doTemplate({ name, tag, tablename: name, src, env })) return error(SYSTEM_ERROR)
    // 输出新地址
    if (!await createFiles({ src: CREATE_OUTBOUND_URL, out, env })) return error(CREATE_FILE_ERROR)
    success('success')
    success('welcome come tbjd')
    success('if you know --help')
    success('cd url:' + out)
  });
};

