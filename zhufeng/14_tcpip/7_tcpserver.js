//写一个聊天室 可以设置昵称 可以广播
const net = require('net')
let clients = {}
let server = net.createServer(socket => {
    socket.setEncoding('utf8')
    server.getConnections((error, count) => {
        socket.write('欢迎光临本聊天室，现在在线人数是' + count + '位\n请输入你的昵称：')
    })
    let username
    socket.on('data', data => {
        if (username) {
            broadcast(username, `${username}：${data}`)
        } else {
            data = data.replace(/\r\n/, '')
            if (clients[data]) {
                socket.write('你的用户名已被占用，请换一个用户名\n')
            } else {
                username = data //把用户输入的信息当成用户名
                clients[username] = socket//缓存用户的socket，方便以后广播用
                broadcast(username, `欢迎${username}加入聊天室\n`)//向所有的客户端发送消息
            }
        }
    })
    socket.on('end', () => {
        broadcast(username, `欢送${username}离开聊天室`)
        clients[username] && clients[username].destroy()//销毁此socket
        delete clients[username]
    })
})

function broadcast(username, msg) {
    for (let name in clients) {
        if (name != username) {
            clients[name].write(msg)
        }
    }
}

server.listen(8080, () => {
    console.log('聊天室已经启动成功,信息是：', server.address())
})