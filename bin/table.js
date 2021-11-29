const fs = require('fs');
const { error, success } = require('../lib/message');
const { KEY_NULL_ERROR, SECRET_NULL_ERROR, PROJECT_NAME_ERROR } = require('../lib/errorCode');
const { createTable, createIndex } = require('../lib/autoTable');

/**
 * 
 * @param {key, secret, database} options 
 */
module.exports = async function(options) {
  // 不传输出地址默认为当前文件夹
  const { key, secret, database } = options;
  // 校验
  if (!key) return error(KEY_NULL_ERROR)
  if (!secret) return error(SECRET_NULL_ERROR)
  if (!database) return error(DATABASE_NAME_ERROR)
  if (!await createTable(options)) return error(CREATE_TABLE_ERROR)
  if (!await createIndex(options)) return error(INDEX_TABLE_ERROR)
};

