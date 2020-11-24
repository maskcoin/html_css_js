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
let crypto = require('crypto')
/*
* 强制缓存
* 把资源缓存在客户端，如果客户端再次需要此资源的时候，先获取到缓存中的数据，看是否过期，如果过期了，再请求服务器
* 如果没过期，则根本不需要向服务器确认，直接使用本地缓存即可
* */
http.createServer((req, res) => {
    //http://localhost:8080/index.html
    let {pathname} = url.parse(req.url, true)
    let filepath = path.join(__dirname, pathname)
    console.log(filepath)
    fs.stat(filepath, (err, stats) => {
        if (err) {
            sendError(req, res)
        } else {
            send(req, res, filepath)
        }
    })
}).listen(8080)

function send(req, res, filepath) {
    res.setHeader('Content-Type', mime.getType(filepath))
    res.setHeader('Cache-Control', 'max-age=30')
    fs.createReadStream(filepath).pipe(res)
}

function sendError(req, res) {
    res.statusCode = 500
    res.end(`there is something wrong in the server, please try latter`)
}