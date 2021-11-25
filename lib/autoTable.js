const fs = require('fs');
const { SYSTEM_ERROR, CHECK_KEY_ERROR } = require('./errorCode');
const { error } = require('./message');
const { HTTP_URL_REQUEST } = require('../lib/finalUrl');
const path = require('path');
const request = require('request')

const defaultObj = {
    createTable: async (options) => {
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
        function createTableApi(data, index) {
            return new Promise(r => {
                request({
                    method: 'post',
                    url: `${HTTP_URL_REQUEST}/duibaclient/db/createDatabase?${queryString(data)}`,
                    headers: {
                        "content-type": "application/json",
                    },
                    json: true
                }, (error ,response, body) => {
                    console.log(body, data);
                    r(index)
                })
            })
        }
        function queryString(params) {
            return Object.keys(params).map(key => key + "=" + params[key]).join("&");
        }
    },
    tableList: () => {
        return [
            'c_game_record','c_user_game','b_activity_config','error_log','c_user','c_awards_record','c_stat_record','c_order_record','c_task_record','c_user_task','b_prize_config','c_open_rank_record','c_user_team','c_user_record','a_seller_info','c_user_awards'
        ]
    }
}
module.exports = defaultObj;
