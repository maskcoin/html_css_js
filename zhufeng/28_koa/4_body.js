const Koa = require('koa')
const path = require('path')
// 可以把一个generator中间件转成一个koa2的中间件
const convert = require('koa-convert')
// const bodyParser =  require('koa-bodyparser')
const bodyParser = require('koa-better-body')
const app = new Koa()
app.listen(3000)

//上传文件，指定上传的目录
app.use(convert(bodyParser({
    uploadDir: path.join(__dirname, 'uploads')
})))

app.use(async function (ctx, next) {
    if (ctx.url === '/user' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8')
        ctx.body = (`
            <form method="post" enctype="multipart/form-data">
                <input type="text" name="username">
                <input type="file" name="avatar">
                <input type="submit">
            </form>
        `)
    } else {
        await next()
    }
})

//如果要上传文件的话，express要用multer中间件  koa里面要用koa-better-body
/*
* "avatar": [
{
"size": 13650,
"path": "/Users/xuchanghui/html_css_js/zhufeng/28_koa/uploads/upload_8a045a6a52c19fef9617b1fe5c2254db",
"name": "密码.rtf",
"type": "text/rtf",
"mtime": "2020-12-02T09:58:41.763Z"
}
]
* */
app.use(async function (ctx, next) {
    if (ctx.url === '/user' && ctx.method === 'POST') {
        //当使用了bodyparser中间件后，当请求到来的时候，会解析请求体赋给ctx.request.body
        ctx.body = ctx.request.fields
    }
})

