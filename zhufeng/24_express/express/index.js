const http = require('http')
const url = require('url')

function createApplication() {
    //app其实就是真正的请求监听函数
    let app = function (req, res) {
        let {pathname} = url.parse(req.url, true)
        for (let i = 0; i < app.routes.length; i++) {
            let route = app.routes[i]
            if ((route.method === req.method.toLowerCase()) && (route.path === pathname)) {
                return route.handler(req, res)
            }
        }
        res.end(`Cannot ${req.method} ${pathname}`)
    }

    app.listen = function () {
        let server = http.createServer(app)
        server.listen.apply(server, arguments)
    }

    //此数组用来保存路由规则
    app.routes = []
    //get就代表HTTP的GET请求
    http.METHODS.forEach((method) => {
        method = method.toLowerCase()
        app[method] = function (path, handler) {
            //向数组里放置路由对象
            app.routes.push({
                method,
                path,
                handler
            })
        }
    })

    return app
}

module.exports = createApplication