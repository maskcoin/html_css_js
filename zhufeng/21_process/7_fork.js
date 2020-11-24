let net = require('net')
let {fork} = require('child_process')
let p1 = fork('./tcpserver.js', [])

let server = net.createServer(socket => {
    if (Math.random() % 2 === 1) {
        //开启一个子进程处理
        p1.send('socket', socket)
    } else {
        let sum = 0
        for (let i =0; i< 10000; i++) {
            sum += i
        }
        socket.write('父进程计算结果是：'+ sum)
    }
})

server.listen(8080)


