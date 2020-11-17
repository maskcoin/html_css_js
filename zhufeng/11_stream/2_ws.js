/*
* 可写流
* */
let fs = require('fs')

let ws = fs.createWriteStream('./2.txt', {
    flags: 'w',
    mode: 0o666,
    start: 0,
    highWaterMark: 3
})

//如果缓存区已满，返回false，如果缓存区未满，返回true
//按理说如果返回了false，就不能再往里写了，但是如果你真写了，数据也不会丢失 ，会缓存在内存里。等缓存区清空后，
let flag = ws.write('1')
console.log(flag);
flag = ws.write('2')
console.log(flag);
flag = ws.write('3')
console.log(flag);
flag = ws.write('4')
console.log(flag);