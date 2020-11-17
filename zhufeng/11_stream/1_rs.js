/*
* 可读流
* */
let fs = require('fs')
let rs = fs.createReadStream('./1.txt', {
    highWaterMark: 3
})

//监听它的data事件，当你一旦开始监听data事件的时候，流就可以读文件的内容并且发射data
rs.on("data", data => {
    console.log(data)
})

rs.on('end', () => {
    console.log('读完了')
})

rs.on('error', err => {
    console.log(err);
})

rs.on('open', ()=>{
    console.log('文件打开')
})

rs.on('close', ()=>{
    console.log('文件关闭')
})