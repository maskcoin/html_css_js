const Koa = require('koa')
const app = new Koa()
//如果获取koa的请求参数
//request response req res
app.use(async function (ctx, next) {
    console.log(ctx.method)
    console.log(ctx.request.url)
    console.log(ctx.request.headers)
    console.log(ctx.querystring)
    console.log(ctx.query)

    /*
    * 1.字符串
    * 2.对象
    * 3.流
    * */
    ctx.response.body = ctx.request.headers
})
app.listen(8080)