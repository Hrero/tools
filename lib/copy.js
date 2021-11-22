const fs = require('fs');
module.exports = function (src, dist, callback) {
    fs.readFile(src, (err, data) => {
        if (err) {
            return callback(err);
        }
        fs.writeFile(dist, data, err => {
            return callback(err);
        });
        callback(null);
    });
};
//# sourceMappingURL=copy.js.map