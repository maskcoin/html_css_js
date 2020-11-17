/*
*流的用法
* */
// let fs = require('fs')
// fs.readFile('./1.txt', (err, data) => {
//     console.log(data);
// })
let LineReader = require('./lineReader')

let reader = new LineReader('./1.txt')

reader.on('newLine', data => console.log(data.toString()))
reader.on('end', () => console.log('over'))