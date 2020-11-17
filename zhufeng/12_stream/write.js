let fs = require('fs')
let WriteStream = require('./WriteStream')
let ws = new WriteStream('./1.txt', {
    flags: 'w',
    mode: 0o666,
    start: 0,
    encoding: 'utf8',
    autoClose: true, //当流写完之后，自动关闭文件
    highWaterMark: 3
})

let n = 9
ws.on('error', err => {
    console.log(err);
})

function write() {
    let flag = true
    while (flag && n > 0) {
        flag = ws.write(n + '','utf8')
        n--
        console.log(flag);
    }
}

ws.on('drain', () => {
    console.log('drain')
    write()
})

write()