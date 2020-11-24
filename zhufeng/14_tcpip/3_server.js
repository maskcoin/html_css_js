// resume pause
let net = require('net')
let ws = require('fs').createWriteStream('./1.txt')
let server = net.createServer(socket => {
    socket.pause()
    //设置客户端的超时时间，如果客户端一直不输入就超过一定的时间，就超时了
    socket.setTimeout(3 * 1000)
    socket.on('timeout', () => {
        console.log('timeout')
        socket.pipe(ws)
    })
})

server.listen(8080)
