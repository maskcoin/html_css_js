//如何创建一个http服务器
//http服务器是继承自tcp服务器，http协议是应用层协议，是基于tcp的
//对请求和响应进行了包装
let http = require('http')
let url = require('url')

/*
> POST / HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.64.1
> Accept:
    > Content-Length: 9
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 9 out of 9 bytes
* */
//req代表客户端的连接，server服务器把客户端的请求信息进行解析，然后放在了req上面
//res代表响应，如果希望向客户端回应消息，需要 通过res
let server = http.createServer((req, res) => {
    console.log(req.method)
    let urlObj = url.parse(req.url)
    console.log(urlObj)
    console.log(req.url)
    console.log(req.headers)
    let result = []

    req.on('data', chunk => {
        result.push(chunk)
    })

    req.on('end', () => {
        let r = Buffer.concat(result)//请求体
        console.log(r.toString())
        res.end(r)
    })
})

server.on('connection', socket => {
    console.log('客户端过来连接了')
})

server.on('close', () => {
    console.log('服务器关闭')
})

server.on('error', err => {
    console.log(err);
})

server.listen(8080, ()=>{
    console.log('server started at http://localhost:8080')
})