/*
* 1.第一次访问服务器的时候，服务器返回资源和缓存的标识，客户端则会把此资源缓存在本地的缓存数据库中
* 2.第二次客户端需要此数据的时候，要取得缓存的标识，然后去问一下服务器我的资源是否是最新的
* 如果是最新的则直接使用缓存数据，如果不是最新的，则服务器返回新的资源和缓存规则，客户端根据新的缓存规则缓存新的数据
* */
let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')
let mime = require('mime')
http.createServer((req, res) => {
    //http://localhost:8080/index.html
    let {pathname} = url.parse(req.url, true)
    let filepath = path.join(__dirname, pathname)
    fs.stat(filepath, (err, stats) => {
        if (err) {
            return sendError(req, res)
        } else {
            let ifModifiedSince = req.headers['if-modified-since']
            let lastModified = stats.ctime.toUTCString()
            if (ifModifiedSince === lastModified) {
                // res.statusCode = 304
                res.writeHead(304)
                res.end('')
            } else {
                send(req, res, filepath, stats)
            }
        }
    })
}).listen(8080)

function send(req, res, filepath, stats) {
    res.setHeader('Content-Type', mime.getType(filepath))
    //发给客户端之后，客户端会把此时间保存起来，下次再获取此资源的时候会把这个时间再发给服务器
    res.setHeader('Last-Modified', stats.ctime.toUTCString())
    fs.createReadStream(filepath).pipe(res)
}

function sendError(req, res) {
    res.statusCode = 500
    res.end(`there is something wrong in the server, please try latter`)
}