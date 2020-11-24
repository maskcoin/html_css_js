let yargs = require('yargs')
let Server =  require('../src/app')
let argv = yargs.option('d', {
    alias: 'root',
    demand: 'false',
    type: 'string',
    default: process.cwd(),
    description: '静态文件根目录'
}).option('o', {
    alias: 'host',
    demand: 'false',
    type: 'string',
    default: 'localhost',
    description: '请配置监听的主机'
}).option('p', {
    alias: 'port',
    demand: 'false',
    type: 'number',
    default: 8080,
    description: '请配置端口号'
}).usage('zf-server2 [options]')
    .example(
        'zf-server2 -d / -p 9090 -o localhost', '在本机的9090端口上监听客户端的请求'
    ).help('h').argv

// argv = {d, root, o, host, d, port}
let server = new Server(argv)

server.start()


