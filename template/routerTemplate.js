if (req.path == '/${NAME}/${TAG}/${API}') {
    try {
        resp.send(JSON.stringify(await fns['${API}']));
    } catch(err) {
        console.info(err, '----调用失败-----');
    }
}
