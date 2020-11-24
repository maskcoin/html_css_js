let net = require('net')

process.on('message', (message, socket) => {
    if (message === 'socket') {
        let sum = 0
        for (let i =0; i< 10000; i++) {
            sum += i
        }
        socket.write('子进程计算结果是：'+ sum)
    }
})