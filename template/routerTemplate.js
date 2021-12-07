if (api == 'i_API') {
    resp.send(JSON.stringify(await fns['i_API']({
        platform: 'jd', // 不传默认淘宝
        openId,
        cloud: { db: cachedDb },
        data: formBody,
        fcName: 'i_NAME',
        handler: 'i_API'
    })));
}
