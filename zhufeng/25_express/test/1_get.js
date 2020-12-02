const express = require('../lib/express')
const app = express()
app.get('/', function (req, res) {
    res.end('hello')
})
app.listen(8080)