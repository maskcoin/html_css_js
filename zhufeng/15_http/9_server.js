let http = require('http')
let querystring = require('querystring')
let server = http.createServer((req, res) => {
    console.log(req.url)
    console.log(req.headers)
    console.log(req.method)
    let result = []
    req.on('data', chunk => {
        result.push(chunk)
    })
    req.on('end', () => {
        let str = Buffer.concat(result).toString()
        //如何把字符串转成对象
        let contentType = req.headers['content-type']
        let body
        if (contentType === "application/x-www-form-urlencoded") {
            body = querystring.parse(str)
        } else if (contentType === "application/json") {
            body = JSON.parse(str)
        } else {
            body = querystring.parse(str)
        }
        res.end(str)
    })
})

server.listen(8080)