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
    const db = await client.db('bcj');
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
    if (req.path == '/bcj/s/getTotalStatsByExcel') {
    try {
        resp.send(JSON.stringify(await fns['getTotalStatsByExcel']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/getTotalStats') {
    try {
        resp.send(JSON.stringify(await fns['getTotalStats']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/addStat') {
    try {
        resp.send(JSON.stringify(await fns['addStat']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/submitGame') {
    try {
        resp.send(JSON.stringify(await fns['submitGame']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/startGame') {
    try {
        resp.send(JSON.stringify(await fns['startGame']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/reduceGameTools') {
    try {
        resp.send(JSON.stringify(await fns['reduceGameTools']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/addGameTools') {
    try {
        resp.send(JSON.stringify(await fns['addGameTools']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/getUserRankList') {
    try {
        resp.send(JSON.stringify(await fns['getUserRankList']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/reissuePrize') {
    try {
        resp.send(JSON.stringify(await fns['reissuePrize']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/receiveObjectPrize') {
    try {
        resp.send(JSON.stringify(await fns['receiveObjectPrize']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/receiveEnamePrize') {
    try {
        resp.send(JSON.stringify(await fns['receiveEnamePrize']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/openPrize') {
    try {
        resp.send(JSON.stringify(await fns['openPrize']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/getPrizeConfig') {
    try {
        resp.send(JSON.stringify(await fns['getPrizeConfig']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/getMyAwardsList') {
    try {
        resp.send(JSON.stringify(await fns['getMyAwardsList']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/exchangePrize') {
    try {
        resp.send(JSON.stringify(await fns['exchangePrize']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/drawLottery') {
    try {
        resp.send(JSON.stringify(await fns['drawLottery']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/getCollectGoods') {
    try {
        resp.send(JSON.stringify(await fns['getCollectGoods']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/receiveTask') {
    try {
        resp.send(JSON.stringify(await fns['receiveTask']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/openLimitTask') {
    try {
        resp.send(JSON.stringify(await fns['openLimitTask']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/completeTask') {
    try {
        resp.send(JSON.stringify(await fns['completeTask']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/getTaskList') {
    try {
        resp.send(JSON.stringify(await fns['getTaskList']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/getUserInfo') {
    try {
        resp.send(JSON.stringify(await fns['getUserInfo']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/login') {
    try {
        resp.send(JSON.stringify(await fns['login']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/getTaobaoItemList') {
    try {
        resp.send(JSON.stringify(await fns['getTaobaoItemList']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
if (req.path == '/bcj/s/getActivityBaseInfoById') {
    try {
        resp.send(JSON.stringify(await fns['getActivityBaseInfoById']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}

    resp.send(JSON.stringify({}, null, '    '));
}
