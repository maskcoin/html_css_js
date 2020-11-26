let http = require('http')
let parse = require('user-agent-parser')
http.createServer((req, res) => {
    let userAgent = req.headers['user-agent']
    console.log(userAgent)
    let userAgentObj = parse(userAgent)
    res.end(JSON.stringify(userAgentObj))
}).listen(8080)