let http = require('http')
process.on('message', (message, sendHandle) => {
    if (message === 'server') {
        http.createServer((req, res) => {
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end('请求在子进程中被处理')
        }).listen(sendHandle)
    }
})