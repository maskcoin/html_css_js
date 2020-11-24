let net = require('net')
//创建一个服务器
//广播 b:内容   此客户端想要向所有的其他客户端广播
//私聊 c：对方的用户名：内容    想向指定的用户名发消息
// 列出在线用户列表 l 表示列出所有的在线用户信息列表
// 修改昵称 n：新名字， 表示此客户端想要修改自己的名称
let clients = {}
let server = net.createServer(socket => {
    let key = socket.remoteAddress + socket.remotePort
    clients[key] = {
        nickname: '匿名',
        socket
    }
    socket.setEncoding('utf8')
    socket.on('data', data => {
        let type = data.slice(0, 1)
        switch (type) {
            case 'b':
                let text = data.slice(2)
                broadcast(text)
                break
            case 'c':
                break
            case 'l':
                break
            case 'n':
                break
            default:
                socket.write('此命令不能识别，请重新输入!\n')
                break
        }
    })

    function broadcast(text) {
        for (let user in clients) {
            if (clients.hasOwnProperty(user)) {
                clients[user].socket.write(text)
            }
        }
    }
})

server.listen(8080)