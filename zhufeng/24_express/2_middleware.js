const express = require('./express')
const app = express()

//使用use来定义一个中间件 next也是一个函数，调用它则意味着当前的中间件执行完毕，可以继续向后执行别的中间件或路由
app.use(function (req, res, next) {
    console.log('没有路径的中间件')
    //调用 next的时候如果传一个任意参数就表示此函数发生了错误，
    //然后express就会跳过后面所有的中间件和路由
    //交给错误中间件来处理
    next('我错了')
})

app.use('/water', function (req, res, next) {
    console.log('过滤杂质')
    next()
})

app.get('/water', function (req, res) {
    res.end('water')
})

//错误处理中间件，有四个参数
app.use(function (err, req, res, next) {
    res.end('错误处理中间件' + err)
})

app.listen(8080, () => {
    console.log('server started at 8080')
})

