//内置中间件 public 静态文件中间件
let express = require('express')
let path = require('path')
let app = express()

//此中间件会拦截客户端的请求，然后去静态文件根目录下面找一下有没有对应的文件，如果有则返回给客户端，如果没有则next往下走
function static(root, options = {}) {

}


app.use(express.static(path.join(__dirname, 'public')))
app.get('/user', function (req, res) {
    res.end('user')
})
app.listen(8080)