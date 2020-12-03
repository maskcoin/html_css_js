class Koa {
    constructor() {
        this.middleware = []
    }
    use(fn) {
        this.middleware.push(fn)
    }
    listen(port) {
        let self = this
        require('http').createServer((req, res) => {
            let ctx = {req, res}
            next(0)
            function next(idx) {
                self.middleware[idx](ctx, ()=> next(idx+1))
            }
        }).listen(port)
    }
}

module.exports = Koa