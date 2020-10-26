/*
*   简单文件写入：
*       fs.writeFileSync(file, data[, options])
*           - file 要操作的文件的路径
*           - 要写入的数据
*       fs.writeFile(file, data[, options], callback)
* */

var fs = require('fs')

fs.writeFile("hello3.txt", "这是通过writeFile写入的内容", function (err) {
    if (!err) {
        console.log("写入成功")
    }
})