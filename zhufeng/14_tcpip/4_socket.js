//当客户端访问服务器的时候，服务器会发送给客户端一个文件
let net = require('net')
let rs = require('fs').createReadStream('./1.test')
net.createServer(socket => {
    rs.on('data', chunk => {
        let flag = socket.write(chunk) //可写流缓存区是否满了
        console.log('flag=', flag)
        console.log('缓存的字节数=', socket.bufferSize)
    })
    socket.on('drain', ()=>{
        console.log('socket缓存区中的数据已经发送')
    })
}).listen(8080)