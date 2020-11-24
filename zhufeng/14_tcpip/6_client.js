let net = require('net')
let socket = new net.Socket()
socket.connect(8080, 'localhost', () => {
    socket.on('data', data => {
        console.log(data.toString())
    })
    socket.write('hello')
})

setTimeout(()=>{
    socket.end()
}, 5000)