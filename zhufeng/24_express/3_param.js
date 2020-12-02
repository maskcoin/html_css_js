const express = require('./express')
const app = express()
// /user?name=zfpx&age=8
//内部靠的是一个内置中间件
app.get('/user', (req, res) => {
    console.log(JSON.stringify(req.query)) // {name:'zfpx', age: 8}
    console.log(req.path) // /user
    console.log(req.hostname)
    res.end('ok')
})
app.listen(8080)