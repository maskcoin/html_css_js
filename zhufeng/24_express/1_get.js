const express = require('./express')
const app = express()
//最重要的是路由功能 ，根据不同的方法和不同的路径 返回不同的内容
//有些时候希望只匹配路径，不管什么方法都能接收
//*表示匹配所有的路径
app.all('*', function (req, res) {
    res.end('hello')
})

app.listen(8080, () => {
    console.log('server started at 8080')
})

