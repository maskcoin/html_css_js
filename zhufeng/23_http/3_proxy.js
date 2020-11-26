let proxy = require('http-proxy')
let proxyServer = proxy.createProxyServer()
//正向代理 帮助或代理局域网内的用户访问外网
let http = require('http')
http.createServer((req, res) => {
    proxyServer.web(req, res, { target: 'http://localhost:9000' })
}).listen(8000)