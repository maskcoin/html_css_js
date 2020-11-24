let dgram = require('dgram')
let socket = dgram.createSocket('udp4')

//发消息


// 收消息 在本机的41234端口上监听消息
socket.bind(41234, '192.168.101.6')
// 监听对方发过来的消息
socket.on('message', (msg, rinfo) => {
    //设置为true表示要广播了
    socket.setBroadcast(true)
    socket.send(msg, rinfo.port, '192.168.101.255')
})
