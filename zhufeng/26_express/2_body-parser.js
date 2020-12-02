let express = require('express')
let http = require('http')
let bodyParser = require('body-parser')
let querystring = require('querystring')
let qs = require('qs')
let app = express()
app.use(text())
// app.use(bodyParser.json())//处理json的请求体
// app.use(bodyParser.urlencoded({extended: true}))//处理表单格式也就是urlencoded格式的请求体

//如果data是数字，会把它当成状态码
// app.use(function (req, res, next) {
//     //res.json
//     res.send = function (data) {
//         let type = typeof data
//         switch (type) {
//             case "object":
//                 data = JSON.stringify(data)
//                 break
//             case "number":
//                 res.statusCode = data
//                 data = http.STATUS_CODES[data]
//                 break
//             default:
//                 break
//         }
//         res.end(data)
//     }
//     next()
// })
//echo
app.post('/user', function (req, res) {
    let body = req.body
    res.send(body) //它可以根据参数的类型进行兼容处理
})
app.listen(8080)

function urlencoded(options) {
    let {extended} = options
    return function (req, res, next) {
        let contentType = req.headers['content-type']
        if (contentType === 'application/x-www-form-urlencoded') {
            let buffers = []
            req.on('data', function (data) {
                buffers.push(data)
            })
            req.on('end', function () {
                let result = buffers.toString()
                if (extended) {
                    //qs可以支持嵌套对象
                    req.body = qs.parse(result)
                } else {
                    req.body = querystring.parse(result)
                }
                next()
            })
        } else {
            next()
        }
    }
}

function json() {
    return function (req, res, next) {
        let contentType = req.headers['content-type']
        if (contentType === 'application/json') {
            let buffers = []
            req.on('data', function (data) {
                buffers.push(data)
            })
            req.on('end', function () {
                let result = buffers.toString()
                req.body = JSON.parse(result)
                next()
            })
        } else {
            next()
        }
    }
}

function text() {
    return function (req, res, next) {
        let contentType = req.headers['content-type']
        if (contentType === 'text/plain') {
            let buffers = []
            req.on('data', function (data) {
                buffers.push(data)
            })
            req.on('end', function () {
                req.body = buffers.toString()
                next()
            })
        } else {
            next()
        }
    }
}