const fs = require('fs');
const { SYSTEM_ERROR, CHECK_KEY_ERROR } = require('./errorCode');
const { error, info } = require('./message');
const { HTTP_URL_REQUEST } = require('../lib/finalUrl');
const path = require('path');
const request = require('request')

const defaultObj = {
    createTable: async (options) => {
        const createTableApi = function (data, index) {
            return new Promise(r => {
                request({
                    method: 'post',
                    url: `${HTTP_URL_REQUEST}/duibaclient/db/createDatabase`,
                    headers: {
                        "content-type": "application/json",
                    },
                    form: data,
                    json: true
                }, (error ,response, body) => {
                    if (body.status === 'success') {
                        info('库 '+ options.database +'初始化一个表 ' + data.table);
                    }
                    r(index)
                })
            })
        }
        return new Promise(async r => {
            const { key, secret, database } = options;
            if (key !== 'tbjds' || secret != 'UhtfW7tGGUEFFi7bqj0N0w==') return error(CHECK_KEY_ERROR);
            const tableList = defaultObj.tableList();
            let index = 0;
            while (tableList.length > index) {
                const pre = await createTableApi({
                    database, key, secret, table: tableList[index]
                }, index)
                index = pre + 1
            }
            r(true)
        })
    },
    createIndex: async (options) => {
        const createIndexApi = function (data, index) {
            const { database, key, secret, table } = data;
            const indexList = defaultObj.indexList();
            const regCUserTableName = new RegExp(/^c_user_/g);
            const regEndRecordName = new RegExp(/_record$/g);
            let fields = [], name = '', unique = true;
            if (regCUserTableName.test(table)) {
                fields = indexList['c_user_*']['fields']
                name = indexList['c_user_*']['name']
                unique = indexList['c_user_*']['unique']
            }
            if (regEndRecordName.test(table)) {
                fields = indexList['*_record']['fields']
                name = indexList['*_record']['name']
                unique = indexList['*_record']['unique']
            }
            if (table === 'c_awards_record') {
                fields = indexList['c_awards_record']['fields']
                name = indexList['c_awards_record']['name']
                unique = indexList['c_awards_record']['unique']
            }
            if (table === 'b_prize_config') {
                fields = indexList['b_prize_config']['fields']
                name = indexList['b_prize_config']['name']
                unique = indexList['b_prize_config']['unique']
            }
            return new Promise(async r => {
                request({
                    method: 'post',
                    url: `${HTTP_URL_REQUEST}/duibaclient/db/createIndex`,
                    headers: {
                        "content-type": "application/json",
                    },
                    form: {...data, fields: JSON.stringify(fields), name, unique},
                    json: true
                }, (err, response, body) => {
                    if (body.status === 'success') {
                        info('----------')
                        info('库'+ database +'初始化一个表索引成功 ' + table + '\n');
                        info(JSON.stringify({...data, fields: JSON.stringify(fields) , name, unique}))
                        info('----------')
                    } else {
                        error('----------')
                        error('库'+ database +'初始化一个表索引失败 ' + table + '\n');
                        error(JSON.stringify({...data, fields: JSON.stringify(fields) , name, unique}))
                        error('----------')
                    }
                    r(index)
                })
            })
        }
        return new Promise(async r => {
            const { key, secret, database } = options;

            if (key !== 'tbjds' || secret != 'UhtfW7tGGUEFFi7bqj0N0w==') return error(CHECK_KEY_ERROR);
            const tableList = defaultObj.tableList();
            let index = 0;
            while (tableList.length > index) {
                const pre = await createIndexApi({
                    database, key, secret, table: tableList[index]
                }, index)
                index = pre + 1
            }
            r(true)
        })
    },
    tableList: () => {
        return [
            'c_game_record','c_user_game','b_activity_config','error_log','c_user','c_awards_record','c_stat_record','c_order_record','c_task_record','c_user_task','b_prize_config','c_open_rank_record','c_user_team','c_user_record','a_seller_info','c_user_awards'
        ]
    },
    indexList: () => {
        return {
            'c_user_*': {
                name: '_user',
                unique: true,
                fields: [
                    { fieldName: 'activityId', order: 'ASC' },
                    { fieldName: 'openId', order: 'ASC' }
                ]
            },
            '*_record': {
                name: '_record',
                unique: false,
                fields: [
                    { fieldName: 'activityId', order: 'ASC' },
                    { fieldName: 'openId', order: 'ASC' },
                    { fieldName: 'createDay', order: 'ASC' },
                    { fieldName: 'key', order: 'ASC' }
                ]
            },
            c_awards_record: {
                name: '_record',
                unique: false,
                fields: [
                    { fieldName: 'activityId', order: 'ASC' },
                    { fieldName: 'openId', order: 'ASC' },
                    { fieldName: 'createDay', order: 'ASC' },
                    { fieldName: 'key', order: 'ASC' },
                    { fieldName: 'prizeDataType', order: 'ASC' }
                ]
            },
            b_prize_config: {
                name: '_prize',
                unique: false,
                fields: [
                    { fieldName: 'activityId', order: 'ASC' },
                    { fieldName: 'prizeDataType', order: 'ASC' },
                    { fieldName: 'deleteStatus', order: 'ASC' }
                ]
            }
        }
    }
}
module.exports = defaultObj;
