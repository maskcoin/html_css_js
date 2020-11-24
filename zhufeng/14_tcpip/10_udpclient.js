let dgram = require('dgram')
let socket = dgram.createSocket('udp4')

let buf = Buffer.from('珠峰培训')
socket.send(buf, 41234, '192.168.101.6')

socket.on('message', (msg, rinfo) => {
    console.log(msg.toString())
})