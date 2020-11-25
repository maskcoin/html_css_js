//要创建一个服务器
process.env.DEBUG = 'static:*'
let config = require('./config')
let util = require('util')
let http = require('http')
let chalk = require('chalk')
let url = require('url')
let path = require('path')
let fs = require('fs')
let zlib = require('zlib')
let handlebars = require('handlebars')
let mime = require('mime')
let {promisify} = require('util')
let stat = promisify(fs.stat)
let readdir = promisify(fs.readdir)
//在代码内部是可以读到环境变量的值的，当然也可以写入环境变量的值
// console.log(process.env)

//这是一个在控制台输出的模块，名称有特点，由两部分组成，第一部分一般是项目名，第二部分一般是模块名
//每个debug实例都有一个名字，是否在控制台打印，取决于环境变量中DEBUG的值是否等于static:app
let debug = require('debug')('static:app')

//编译模版，得到一个渲染的方法，然后传入实际数据就可以得到渲染后的HTML了
function list() {
    let tmp = fs.readFileSync(path.resolve(__dirname, 'templates', 'list.html'), 'utf8')
    return handlebars.compile(tmp)
}

/*
* 1.显示目录下面的文件列表和返回内容
* 2.实现压缩的功能
* 3.实现缓存
* */
class Server {
    constructor(argv) {
        this.list = list()
        this.config = {}
        Object.assign(this.config, config)
        Object.assign(this.config, argv)
    }

    start() {
        let self = this
        //静态文件服务器
        http.createServer(async function (req, res) {
            //先取到客户端想访问的文件或文件夹路径
            let {pathname} = url.parse(req.url)
            // if (pathname === '/favicon.ico') {
            //     self.sendError(req, res)
            //     return
            // }
            let filepath = path.join(self.config.root, pathname)
            try {
                let statObj = await stat(filepath)
                if (statObj.isDirectory()) { //如果是目录的话，应该显示目录下面的文件列表
                    let files = await readdir(filepath)
                    files = files.map(file => ({
                        name: file,
                        url: path.join(pathname, file)
                    }))
                    let listHTML = self.list({
                        title: pathname,
                        files
                    })

                    self.sendDir(req, res, listHTML)
                } else {
                    self.sendFile(req, res, filepath, statObj)
                }
            } catch (e) {
                debug(util.inspect(e)) //inpsect把一个对象转成字符串
                self.sendError(req, res)
            }
        }).listen(self.config.port, () => {
            let url = `http://${self.config.host}:${self.config.port}`
            debug(`server started at ${chalk.green(url)}`)
        })
    }


    sendError(req, res) {
        res.statusCode = 500
        res.end(`there is something wrong in the server, please try latter`)
    }

    sendFile(req, res, filepath, statObj) {
        if (this.handleCache(req, res)) { //如果走
            return
        }

        res.setHeader('Content-Type', mime.getType(filepath))
        let encoding = this.getEncoding(req, res)
        if (encoding) {
            fs.createReadStream(filepath).pipe(encoding).pipe(res)
        } else {
            fs.createReadStream(filepath).pipe(res)
        }
    }

    handleCache(req, res) {
        let ifModifiedSince = req.headers['if-modified-since']
        let ifNoneMatch = req.headers['if-none-match']
    }


    getEncoding(req, res) {
        //accept-encoding: gzip, deflate, br
        let acceptEncoding = req.headers['accept-encoding']
        if (/\bgzip\b/.test(acceptEncoding)) {
            return zlib.createGzip()
        } else if (/\bdeflate\b/.test(acceptEncoding)) {
            return zlib.createDeflate()
        } else {
            return
        }
    }

    sendDir(req,  res, listHTML) {
        res.setHeader('Content-Type', 'text/html')
        res.end(listHTML)
    }
}

// let server = new Server()
// server.start()//启动服务
module.exports = Server