let http = require('http')
let crypto = require('crypto')
// let path = require('path')
// let rs = require('fs').createReadStream('./msg.txt', {
//     highWaterMark: 2
// })

let md5 = crypto.createHash('md5')
// let md5Val
// rs.on('data', chunk => {
//     md5.update(chunk) //update可以执行多次
// })
// rs.on('end', () => {
//     md5Val = md5.digest('hex')
// })
//
// http.createServer((req, res) => {
//     res.setHeader('Content-MD5', md5Val)
// }).listen(8080)
md5.update('123456')
let md5Val = md5.digest('hex')
console.log(md5Val)


