let http = require('http')
let path = require('path')
let url = require('url')
let fs = require('fs')
let zlib = require('zlib')
let {promisify} = require('util')
let mime = require('mime')
//把一个异步方法转成一个返回promise的方法
let stat = promisify(fs.stat)
/*
*客户端向服务器发起请求的时候，会通过Accept-Encoding: gzip, deflate, br
* */
http.createServer(async function (req, res)  {
    let {pathname} = url.parse(req.url)// /msg.txt
    let filepath =  path.join(__dirname, pathname);

    try {
        let statObj = await stat(filepath)
        //可以根据不同的文件内容类型返回不同的Content-Type
        res.setHeader('Content-Type', mime.getType(filepath))
        //为了兼容不同的浏览器，node把所有的请求头全转成了小写
        let acceptEncoding = req.headers['accept-encoding']
        // 内容协商
        if (acceptEncoding) {
            if (acceptEncoding.match(/\bgzip\b/)) {
                res.setHeader('Content-Encoding', 'gzip')
                fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res)
            } else if (acceptEncoding.match(/\bdeflate\b/)) {
                res.setHeader('Content-Encoding', 'deflate')
                fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res)
            } else {
                fs.createReadStream(filepath).pipe(res)
            }
        } else {
            fs.createReadStream(filepath).pipe(res)
        }
    } catch (e) {
        res.statusCode = 404
        res.end()
    }

}).listen(8080)