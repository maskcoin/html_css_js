let http = require('http')
let options = {
    host: 'localhost',
    port: 8080,
    method: 'POST',
    path: '/user',
    headers: {
        'Content-Type': "text/plain"
    }
}
let req = http.request(options, res => {
    res.pipe(process.stdout)
})

req.end('珠峰培训')

