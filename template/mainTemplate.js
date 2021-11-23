const MongoClient = require("mongodb").MongoClient;
const { dateFormat } = require('dt-utils-js');
const fns = require('./main.js').default;

const MONGODB_URI =
  "mongodb://root:8IuKSBHqeDAW3yib@dds-bp110dc7978f97741667-pub.mongodb.rds.aliyuncs.com:3717";
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
    const db = await client.db('i_TABLENAME');
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
    i_ROUTER
    resp.send(JSON.stringify({}, null, '    '));
}
