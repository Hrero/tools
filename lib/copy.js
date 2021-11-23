const fs = require('fs');
const { error } = require('./message');
const { FILE_PATH_ERROR } = require('./errorCode');


module.exports = {
    copy: function (src, dist, callback) {
        fs.readFile(src, (err, data) => {
            if (err) {
                return callback(err);
            }
            fs.writeFile(dist, data, err => {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        });
    },
    isDirectory: function (src) {
        return new Promise((r, j) => {
            fs.stat(src, function(err, data){
                if (err) {
                    return error(FILE_PATH_ERROR)
                }
                r(data.isDirectory())
            });
        })
    },
    getStat: function getStat(path){
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if(err){
                    resolve(false);
                }else{
                    resolve(stats);
                }
            })
        })
    },
    mkdir: function mkdir(dir){
        return new Promise((resolve, reject) => {
            fs.mkdir(dir, err => {
                if(err){
                    resolve(false);
                }else{
                    resolve(true);
                }
            })
        })
    },
    dirExists: async function dirExists(dir){
        let isExists = await getStat(dir);
        //如果该路径且不是文件，返回true
        if(isExists && isExists.isDirectory()){
            return true;
        } else if (isExists){     //如果该路径存在但是文件，返回false
            return false;
        }
        //如果该路径不存在
        let tempDir = path.parse(dir).dir;      //拿到上级路径
        //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
        let status = await dirExists(tempDir);
        let mkdirStatus;
        if(status){
            mkdirStatus = await mkdir(dir);
        }
        return mkdirStatus;
    }
}
//# sourceMappingURL=copy.js.map