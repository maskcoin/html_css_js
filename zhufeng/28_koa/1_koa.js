const Koa = require('koa')
app = new Koa()
app.listen(8080)
//koa推荐使用async
//ctx context是koa提供的一个对象，包含一些常见的方法和属性
app.use(async function (ctx, next) {
    console.log(1)
    await next()
    console.log(2)
})
app.use(async function (ctx, next) {
    console.log('a')
    // ctx.res.send(ctx)
})