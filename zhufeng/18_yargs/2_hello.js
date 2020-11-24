let yargs = require('yargs')
//它可以帮 我们解析命令行参数
let argv = yargs.options('n', {
    alias: 'name', //别名
    demand: 'true', //必填
    default: '',
    description: '请输入你的姓名'
}).argv
console.log(argv)
console.log('hello ' + argv.name)
