// send方法其实可以有两个参数，第一个参数是任意类型 第二个参数只能是http server 或net server 或socket
let {fork} = require('child_process')
let http = require('http')

let server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end('请求在父进程中被处理')
})

server.listen(8080)

let os =  require('os')
for (let i=0; i<os.cpus().length; i++ ){
    let p1 = fork('server.js', [])
    p1.send('server', server)
}
