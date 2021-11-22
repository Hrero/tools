#!/usr/bin/env node

const copy = require('./copy');
const argvList = process.argv.slice(2);
console.log(argvList, process.argv);
copy(argvList[0], argvList[1], err => {
    if (err) {
        console.log("复制文件失败了");
    } else {
        console.log("复制文件成功");
    }
});
console.log("copy()复制被执行了");
//# sourceMappingURL=index.js.map