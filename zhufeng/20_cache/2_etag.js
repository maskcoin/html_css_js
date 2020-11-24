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
http.createServer((req, res) => {
    //http://localhost:8080/index.html
    let {pathname} = url.parse(req.url, true)
    let filepath = path.join(__dirname, pathname)
    fs.stat(filepath, (err, stats) => {
        if (err) {
            return sendError(req, res)
        } else {
            let ifNoneMatch = req.headers['if-none-match']
            let rs = fs.createReadStream(filepath)
            let md5 = crypto.createHash('md5')
            rs.on('data', chunk => {
                md5.update(chunk)
            })
            rs.on('end', ()=>{
                let eTag = md5.digest('hex')
                if (ifNoneMatch === eTag) {
                    res.statusCode = 304
                    // res.writeHead(304)
                    res.end('')
                } else {
                    send(req, res, filepath, eTag)
                }
            })
        }
    })
}).listen(8080)

function send(req, res, filepath, eTag) {
    res.setHeader('Content-Type', mime.getType(filepath))
    //第一次服务器返回的时候，会把文件的内容算出来一个标识，发给客户端
    fs.readFile(filepath, (err, data) => {
        //客户端看到ETag之后，也会把此标识保存在客户端，下次再访问服务器的时候，发给服务器
        res.setHeader('ETag', eTag)
        fs.createReadStream(filepath).pipe(res)
    })
}

function sendError(req, res) {
    res.statusCode = 500
    res.end(`there is something wrong in the server, please try latter`)
}