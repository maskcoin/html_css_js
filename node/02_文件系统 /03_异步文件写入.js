/*
*   异步文件写入
*       fs.open(path[, flags[, mode]], callback)
*           - 用来打开一个文件
*           - 异步调用的方法，结果都是通过回调函数的参数返回的
*           - 回调函数两个参数：
*               err 错误对象，如果没有错误则为null（错误优先思想）
*               fd 文件的描述符
* */

//引入fs模块
var fs = require('fs')


fs.open("./hello2.txt", "w", function (err, fd) {
    //判断是否出错
    if (!err) {
        fs.write(fd, "这是我们异步写入的内容", function (err) {
            if (!err) {
                console.log('写入成功')
            }
            //关闭文件
            fs.close(fd, function (err) {
                if (!err) {
                    console.log('文件已关闭')
                }
            })
        })
    } else {
        console.log(err)
    }
    // console.log(arguments)
})

