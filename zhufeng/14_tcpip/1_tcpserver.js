let net = require('net')

//创建一个服务器 ，监听客户端的连接，当客户端连接上来后，执行监听函数
let server = net.createServer(socket => {
    console.log('客户端已经连接')
    console.log(socket.address())
    socket.on('data', data => {
        console.log('接收到客户端发过来的数据:%s', data)
        socket.write('服务器确认' + data)
    })
    socket.on('error', err => {
        console.log(err);
    })
    socket.on('end', () => {
        console.log('end')
    })
})

server.listen(8080, () => {
    console.log(server.address());
    console.log('服务器启动成功')
})