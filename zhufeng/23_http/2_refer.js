let http = require('http')
let fs = require('fs')
let path =  require('path')
let mime = require('mime')
let url = require('url')
let server  = http.createServer((req, res) => {
    let referer = req.headers.referer
    //如果有referer的话，则表示是从html页面中引用过来的
    //Referer: http://localhost:8080/
    if (referer) {
        let hostname1 = url.parse(referer, true).hostname
        let hostname2 = url.parse(req.url, true).hostname
        if (hostname1 !== hostname2) {
            res.setHeader('Content-Type', mime.getType(path.join(__dirname, 'mm.jpeg')))
            fs.createReadStream(path.join(__dirname, '2.jpg')).pipe(res)
            return
        }
    }
    res.setHeader('Content-Type', mime.getType(path.join(__dirname, 'mm.jpeg')))
    fs.createReadStream(path.join(__dirname, 'mm.jpeg')).pipe(res)
})

server.listen(8080)