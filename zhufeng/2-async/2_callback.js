/*
* 比如我现在要读取一个文件，异步读取
* */
let fs = require('fs')

/*
* 回调的特点是error first
* 调用回调函数的时候第一个参数永远是错误对象
* */
// fs.readFile('./1.txt', 'utf8', function (err, data) {
//     if (err) { //如果err有值，就表示程序出错了
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })

/*
* 回调函数的问题
* 1.无法捕获错误 try catch
* 2.不能return
* 3.回调地狱
*
* */
// function read(filename) {
//     fs.readFile(filename, 'utf8', function (err, data) {
//         if (err) { //如果err有值，就表示程序出错了
//             console.log(err)
//         } else {
//             console.log(data)
//         }
//     })
// }
//
// let result = read('./1.txt')
// console.log(result)
// console.log(2)

/*
* 当你访问服务器的时候，比如要 请求一个html页面。比如是用户列表
* 服务器一方面回去读取模版文件，可能是ejs，jade，另外一方面去读取数据（可能会放在文件里，也有可能会放在数据库里），它们都很慢
* 都是异步的。
* 这种恶魔金字塔有以下问题
* 1.非常难看
* 2.非常难以维护
* 3.效率比较低，因为它们是串行的
* */
// fs.readFile('./template.txt', 'utf8', function (err, template) {
//     fs.readFile('./data.txt', 'utf8', function (err, data) {
//         console.log(template + ' ' + data)
//     })
// })

//如何解决这个回调嵌套的问题
//1.通过事件发布订阅来实现
//这是node核心模块的一个类，通过它可以创建事件发射器的实例，里面有两个核心方法，
//一个叫on 一个叫emit，on表示注册监听，emit表示发射事件
let EventEmitter = require('events')
let eve = new EventEmitter()
//这个html对象存放最终数据
let html = {} //template data

//监听数据获取成功事件，当事件发生之后调用回调函数
// eve.on('ready', function (key, value) {
//     html[key] = value
//     if (Object.keys(html).length === 2) {
//         console.log(html)
//     }
// })
//
// fs.readFile('./template.txt', 'utf8', function (err, template) {
//     eve.emit('ready', 'template', template)
// })
//
// fs.readFile('./data.txt', 'utf8', function (err, data) {
//     eve.emit('ready', 'data', data)
// })

// 通过一个哨兵函数来处理

// function done(key, value) {
//     html[key] = value
//     if (Object.keys(html).length === 2) {
//         console.log(html)
//     }
// }

function render(length, cb) {
    let html = {}
    return function (key, value) {
        html[key] = value
        if (Object.keys(html).length === length) {
            cb(html)
        }
    }
}

let done = render(2, function (html) {
    console.log(html)
})

fs.readFile('./template.txt', 'utf8', function (err, template) {
    done('template', template)
})

fs.readFile('./data.txt', 'utf8', function (err, data) {
    done('data', data)
})
