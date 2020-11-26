const express = require('./express')
const app = express()
//最重要的是路由功能 ，根据不同的方法和不同的路径 返回不同的内容
app.get('/hello', function (req, res) {
    res.end('hello ')
})

app.post('/world', function (req, res) {
    res.end('world ')
})


app.listen(8080, () => {
    console.log('server started at 8080')
})

