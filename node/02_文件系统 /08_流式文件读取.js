/*
* 流式文件读取也适用于一些比较大的文件
* */
var fs = require('fs')
var rs = fs.createReadStream("./an.jpg")
var ws = fs.createWriteStream("./my2.jpg")

rs.pipe(ws)