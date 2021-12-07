const MongoClient = require("mongodb").MongoClient;
const { dateFormat } = require('dt-utils-js');
const fns = require('./main.js').default;
const getFormBody = require('body/form');
const getRawBody = require('raw-body');

const MONGODB_URI =
  "mongodb://root:8IuKSBHqeDAW3yib@121.196.178.118:27017";
const config = {
  connectTimeoutMS: 1000,
  // 服务器发现和监视引擎
  useUnifiedTopology: true
}

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    const client = await MongoClient.connect(MONGODB_URI, config);
    const db = await client.db(`i_TABLENAME_i_ENV`);
    cachedDb = db;
    return db
  } catch (err) {
    console.log("MongoDB connect faild: " + err.stack);
  }
}

exports.initializer = async (context, callback) => {
  await connectToDatabase();
  callback(null, '');
}

exports.handler = async (req, resp, context) => {
    console.log('项目已启动' + dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'));
      getRawBody(req, async function(err, formBody) {
        const [func, handler, api] = req.path.substr(1, req.path.length).split('/')
        formBody = JSON.parse(formBody);
        const { openId } = formBody;
        try {
          console.log(func, handler, api)
          if (handler === 'jdapi') {
              const data = await fns.JDAPI[api]({ platform: 'jd', openId }, formBody)
              resp.send(JSON.stringify(data))
              console.log(data, '----返回数据-----');
          }
        } catch (error) {
          resp.send(JSON.stringify(error))
        }
        i_ROUTER
      });
}
