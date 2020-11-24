let fs = require('fs')
let zlib = require('zlib')
let path = require('path')

//用于实现压缩 transform转换流，继承自duplex双工流
function gzip(src) {
    fs.createReadStream(src).pipe(zlib.createGzip()).pipe(fs.createWriteStream(src + '.gz'))
}

function gunzip(src) {
    // fs.createReadStream(src).pipe(zlib.createGunzip()).pipe(fs.createWriteStream(src + '.txt'))
    fs.createReadStream(src).pipe(zlib.createGunzip()).pipe(fs.createWriteStream(path.basename(src, '.gz')))
}

gunzip('./msg.txt.gz')

// gzip('./msg.txt')

// function gunzip(src) {
//     fs.createReadStream(src).pipe(zlib.createGunzip())//.pipe(fs.createWriteStream(src.split('.')[0]))
// }
//
// gunzip('msg.txt.gz')