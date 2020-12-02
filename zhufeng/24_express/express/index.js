const http = require('http')
const url = require('url')

function createApplication() {
    //app其实就是真正的请求监听函数
    let app = function (req, res) {
        let {pathname} = url.parse(req.url, true)
        let index = 0
        function next(err) {
            if (index >= app.routes.length) {
                return res.end(`Cannot ${req.method} ${pathname}`)
            }

            let route = app.routes[index++]

            if (err) {
                //先判断是不是中间件
                if (route.method === 'middle') {
                    //如果是中间件，再看路径是否匹配
                    if (route.path === '/' || pathname.startsWith(route.path+'/') || pathname === route.path) {
                        //再看看是不是错误处理中间件
                        if (route.handler.length === 4) {
                            route.handler(err, req, res, next)
                        } else {
                            next(err)
                        }
                    } else {
                        next(err)
                    }
                } else {
                    next(err)
                }
            } else {
                if (route.method === 'middle') {
                    //只要请求路径是以此中间件的路径开头就可以
                    if (route.path === '/' || pathname.startsWith(route.path+'/') || pathname === route.path) {
                        route.handler(req, res, next)
                    } else {
                        next()
                    }
                } else { //路由
                    if (route.paramsNames) {//意味着有路径参数
                        let matchers = pathname.match(route.path)
                        // matchers = [匹配结果，分组]
                        if (matchers) {
                            let params = {}
                            //paramsNames有了
                            for (let i=0; i<route.paramsNames.length; i++) {
                                params[route.paramsNames[i]] = matchers[i+1]
                            }
                            req.params = params
                            route.handler(req, res)
                        } else {
                            next()
                        }
                    } else {
                        if (((route.method === req.method.toLowerCase()) || (route.method === 'all')) && ((route.path === pathname) || (route.path === '*'))) {
                            return route.handler(req, res)
                        } else {
                            next()
                        }
                    }
                }
            }
        }
        next()
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
            const layer = {method, path, handler}
            if (path.includes(':')) {
                let paramsNames = []
                //1.把原来的路径转成正则表达式
                //2.提取出变量名
                path = path.replace(/:([^\/]+)/g, function () {
                    paramsNames.push(arguments[1])
                    return '([^\/]+)'
                })
                // /user/([^/]+)/([^/]+)
                layer.path = new RegExp(path)//路径变成了正则表达式
                layer.paramsNames = paramsNames//变量名的数组
            }
            //向数组里放置路由对象
            app.routes.push(layer)
        }
    })

    //all方法可以匹配所有的HTTP请求方法
    app.all = function (path, handler) {
        app.routes.push({
            method: 'all',
            path,
            handler
        })
    }

    //添加一个中间件
    app.use = function (path, handler) {
        if (typeof handler !== 'function') {
            handler = path
            path = '/'
        }
        app.routes.push({
            method: 'middle',
            path,
            handler
        })
    }

    //系统内置中间件，用来为请求和响应对象添加一些方法和属性
    app.use(function (req, res, next) {
        const urlObj = url.parse(req.url, true)
        req.query = urlObj.query
        req.path = urlObj.pathname
        req.hostname = req.headers['host'].split(':')[0]
        next()
    })

    return app
}

module.exports = createApplication