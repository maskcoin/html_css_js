const express = require('express')
const app = express()

//param是用来处理路径参数的
app.param('id', function (req, res, id) {

})
// /user?name=zfpx&age=8
// : 意味着这个部分是一个占位符，用来匹配一个任意的字符串
// restful api GET /user/1 获取ID为1的用户详情
// /user/zfpx/9
// vue react 路径参数
app.get('/user/:name/:age', (req, res) => {
    console.log(req.params)
    res.end('ok')
})
app.listen(8080)