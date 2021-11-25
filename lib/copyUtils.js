const fs = require('fs');
const { error } = require('./message');
const { FILE_PATH_ERROR, STR_TYPE_ERROR, INDEX_TRANSFORM_ERROR, SYAML_TRANSFORM_ERROR, MAIN_READ_ERROR, MAIN_WRITE_ERROR, FILR_OUTBROUND_ERROR } = require('./errorCode');
const path = require('path');

const { CWD_PACKAGE_URL, MAIN_TEMPLATE_URL, ROUTER_TEMPLATE_URL, SYAML_TEMPLATE_URL, PACKAGE_TEMPLATE_URL, USER_PACKAGE_TEMPLATE_URL,
    CREATE_OUTBOUND_URL, ROUTER_OUTBOUND_URL, SYAML_OUTBOUND_URL, PACKAGE_OUTBOUND_URL} = require('./finalUrl');

const defaultObj = {
    copy: async (src, dist, callback) => {
        await defaultObj.mkdir(CREATE_OUTBOUND_URL);
        fs.readFile(src, (err, data) => {
            if (err) {
                error(MAIN_READ_ERROR)
                return callback(err);
            }
            fs.writeFile(dist, data, err => {
                if (err) {
                    error(MAIN_WRITE_ERROR)
                    return callback(err);
                }
                return callback(null);
            });
        });
    },
    writeFile: (src, data) => {
        return new Promise((r, j) => {
            fs.writeFile(src, data, 'utf8', err => {
                if (err) {
                    return error(err);
                }
                return r(src);
            });
        })
    },
    readFile: async (src) => {
        return new Promise((r, j) => {
            fs.readFile(src, 'utf8', (err, data) => {
                if (err) {
                    error(err);
                    r(false)
                }
                r(data)
            });
        })
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
    },
    replaceStr: async (options) => {
        const { name, tag, tablename, api, str, router } = options;
        if (typeof str !== 'string') return error(STR_TYPE_ERROR)
        return str.replace(new RegExp(defaultObj.definitionName('name'), 'gi'), name)
                    .replace(new RegExp(defaultObj.definitionName('tag'), 'gi'), tag)
                    .replace(new RegExp(defaultObj.definitionName('tablename'), 'gi'), tablename)
                    .replace(new RegExp(defaultObj.definitionName('api'), 'gi'), api)
                    .replace(new RegExp(defaultObj.definitionName('router'), 'gi'), router)
    },
    definitionName: (value) => { return `i_${value.toUpperCase()}` },
    doTemplate: async (options) => {
        if (!await defaultObj.doRouterTemplate(options)) return error(INDEX_TRANSFORM_ERROR)
        if (!await defaultObj.doYamlTemplate(options)) return error(SYAML_TRANSFORM_ERROR)
        if (!await defaultObj.doPackageTemplate(options)) return error(PACKAGE_TRANSFORM_ERROR)
        return true
    },
    doYamlTemplate: async (options) => {
        // 生成s.yaml
        return await defaultObj.writeFile(SYAML_OUTBOUND_URL,
            await defaultObj.replaceStr({...options, str: await defaultObj.readFile(SYAML_TEMPLATE_URL)})
        )
    },
    doRouterTemplate: async (options) => {
        const { src } = options;
        // 判断执行目录是否有package.json文件
        if (!await defaultObj.readFile(CWD_PACKAGE_URL)) await defaultObj.writeFile(CWD_PACKAGE_URL, await defaultObj.readFile(USER_PACKAGE_TEMPLATE_URL))
        
        const router = await Object.keys(require(src).default).reduce(async (total, api) => {
            return (await total) + await defaultObj.replaceStr({...options, api, str: await defaultObj.readFile(ROUTER_TEMPLATE_URL)})
        }, '');
        // 生成index.js
        return await defaultObj.writeFile(ROUTER_OUTBOUND_URL, 
            await defaultObj.replaceStr({...options, router, str: await defaultObj.readFile(MAIN_TEMPLATE_URL)})
        )
    },
    doPackageTemplate: async (options) => {
        // 生成package.json
        return await defaultObj.writeFile(PACKAGE_OUTBOUND_URL, 
            await defaultObj.readFile(PACKAGE_TEMPLATE_URL)
        )
    }
}
module.exports = defaultObj;
