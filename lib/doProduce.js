const fs = require('fs');
const { SYSTEM_ERROR } = require('./errorCode');
const { error } = require('./message');
const path = require('path');

const defaultObj = {
    createFiles: (options) => {
        const { src, out } = options;
        return defaultObj.copyFile(src, out);
    },
    isExist: (path) => {
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path)
        }
    },
    copyFile: (sourcePath, targetPath) => {
        const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true })
        try {
            sourceFile.forEach(file => {
                const newSourcePath = path.resolve(sourcePath, file.name)
                const newTargetPath = path.resolve(targetPath, file.name)
                if (file.isDirectory()) {
                    defaultObj.isExist(newTargetPath)
                    defaultObj.copyFile(newSourcePath, newTargetPath)
                }
                fs.copyFileSync(newSourcePath, newTargetPath)
            })
            return true
        } catch (err) {
            return error(SYSTEM_ERROR)
        }
    }
}
module.exports = defaultObj;
