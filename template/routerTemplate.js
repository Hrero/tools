if (req.path == '/i_NAME/i_TAG/i_API') {
    try {
        resp.send(JSON.stringify(await fns['i_API']()));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
