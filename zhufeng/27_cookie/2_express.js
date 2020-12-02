const express =  require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser('hanxing614'))
app.get('/write', function (req, res) {
    //signed = true 表示要加密
    cookie('name', 'zfpx', {signed: true})
    // res.cookie('age', '8')
    res.end('write ok')
})
app.get('/read', function (req, res) {
    // let cookie = req.headers['cookie']
    // res.send(req.cookies) //cookies只能读到未签名的cookie
    res.send(req.signedCookies)
    // console.log(req.signedCookies)
})
app.listen(8080)

//s%3Azfpx.VKQXjP89ErcA1cAPHULsb%2FohG1NV0A3GRg5ejX9mYuY
//基于真实的值和密钥签了一个名。一旦值被人改掉了，则签名验证会失败
//s:zfpx.VKQXjP89ErcA1cAPHULsb/ohG1NV0A3GRg5ejX9mYuY

function cookie(name, value, options) {
    let {signed=false} = options
}
