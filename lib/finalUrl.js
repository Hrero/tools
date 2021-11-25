
const outbound = process.env.HOME || process.env.USERPROFILE;
const path = require('path');
const pwd = path.resolve(__dirname, '../');
const cwd = process.cwd();

exports.CWD_PACKAGE_URL = `${cwd}/package.json`;

// 读取
exports.MAIN_TEMPLATE_URL = `${pwd}/template/mainTemplate.js`;
exports.ROUTER_TEMPLATE_URL = `${pwd}/template/routerTemplate.js`;
exports.SYAML_TEMPLATE_URL = `${pwd}/template/s.yaml`;
exports.PACKAGE_TEMPLATE_URL = `${pwd}/template/packageTemplate.json`;
exports.USER_PACKAGE_TEMPLATE_URL = `${pwd}/template/userPackageTemplate.json`;

// 输出
exports.CREATE_OUTBOUND_URL = `${outbound}/outbound`;
exports.ROUTER_OUTBOUND_URL = `${outbound}/outbound/index.js`;
exports.SYAML_OUTBOUND_URL = `${outbound}/outbound/s.yaml`;
exports.PACKAGE_OUTBOUND_URL = `${outbound}/outbound/package.json`;
exports.MAIN_OUTBOUND_URL = `${outbound}/outbound/main.js`;

// 请求
exports.HTTP_URL_REQUEST = 'http://duiba.haozengrun.com';
// exports.HTTP_URL_REQUEST = 'http://localhost:3000';
