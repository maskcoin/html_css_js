let net = require('net')
let server = net.createServer(connectionListener)

function connectionListener(socket) {
    socket.on('data', data => {
        let {req, res} = parse(socket, data)
        server.emit('request', req, res)
    })
}

function parse(socket, data) {
    let req = parser(data)
    let res = {write: socket.write.bind(socket), end: socket.end.bind(socket)}

    return {req, res}
}

server.on('request', (req, res) => {
    console.log(req.headers);
})

server.listen(8080)