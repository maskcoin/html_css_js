let net = require('net')
//当客户端连接上来的时候会执行对应的回调函数
//socket其实是一个可读可写流，是一个双工流
let server = net.createServer({}, socket => {
    //获取当前有多少个客户端正在连接服务器
    server.getConnections((error, count) => {
        console.log(`欢迎光临，现在连接的客户端总数量是${count}个`)
    })

    console.log(socket.address())
    // socket.setEncoding('utf8')
    socket.on('data', data => {
        console.log('服务器接收到客户端发送过来的数据：', data.toString())
        socket.write('服务器回应：'+ data)
    })
    //服务器收到客户端发出的关闭连接请求时，会触发end事件
    //在这个地方客户端并没有真正关闭，只是开始关闭，当真正关闭的时候，还会触发一个close事件
    socket.on('end', () => {
        console.log('客户端已经关闭')
        //close服务器端有一个方法叫close，
        //一旦调用了此方法，则当所有的客户端都关闭后，将关闭服务器
        server.unref()
    })

    // setTimeout(()=>{
    //     server.close()
    // }, 5000)

    //had_error如果为true表示异常关闭，否则表示异常关闭
    socket.on('close', had_error => {
        console.log(had_error);
    })
})

server.listen(8080, () => {
    console.log(server.address())
    console.log('服务器端已经启动')
})

