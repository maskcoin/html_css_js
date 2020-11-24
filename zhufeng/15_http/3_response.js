let http = require('http')
//如何向客户端写入响应信息
/*
* < HTTP/1.1 200 OK 响应行
< Date: Thu, 19 Nov 2020 09:32:40 GMT   响应头
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 9
*
*
* name=zfpx  响应体
*
*
* < HTTP/1.1 200 OK
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked  分块传输
<
* Connection #0 to host localhost left intact
helloworld* Closing connection 0
* */
let server = http.createServer((req, res) => {
    //在同一个方法里设置状态码，原因短语，响应头
    //writeHead一旦调用会立刻向客户端发送，setHead不会
    res.writeHead(200, '成功了', {
        "Content-Type": "text/html;charset=utf8"
    })
    // res.statusCode = 200 //设置响应码
    // res.sendDate = false //Date响应头默认会设置，如果真的不想要，可以设置为false
    // res.setHeader('Content-Type', 'text/html;charset=utf8') //设置响应头
    // console.log(res.getHeader('Content-Type'))
    // res.removeHeader('Content-Type')
    // console.log(res.getHeader('Content-Type'))
    // res.write('hello')
    // res.write('world')
    // res.end()
})

server.listen(8080)