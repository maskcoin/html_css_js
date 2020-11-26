/*
* 弹性计算云服务器 ECS 是一个完整的服务器
* 虚拟主机 你得到的只是此服务器上的一个目录而已
* */
let http = require('http')
let httpProxy = require('http-proxy')
let proxy = httpProxy.createProxyServer();

let config = {
    "maskcoin.com": "http://localhost:8000"
}

//nginx 核心功能就是这个，这个就是反向代理
let server = http.createServer((req, res) => {
    let host = req.headers.host
    let target = config[host]
    if (target) {
        proxy.web(req, res, { target });
    } else {
        res.end('80')
    }
}).listen(80)

//http://localhost