/*
*   fs核心模块来读写文件
* */
let fs = require('fs')

// fs.readFile('./1.txt', {
//     encoding: 'utf8',
//     flag: 'r'
// },(err, data) => {
//     if (err) {
//         console.error(err)
//     } else {
//         console.log(data);
//     }
// })

// fs.writeFile('./2.txt', 'data', {
//     encoding: 'utf8',
//     flag: 'w',
//     mode: 0o666
// }, ()=>{})
//
// fs.appendFile('./2.txt, ')
// fs.open('./1.txt', 'r', 0o666, ((err, fd) => {
//     let buf = Buffer.alloc(4)
//     fs.read(fd, buf, 0, 3, null, ((err1, bytesRead, buffer) => {
//         console.log(buffer.toString());
//         let buf2 = Buffer.alloc(4)
//         fs.read(fd, buf2, 0, 3, null, ((err2, bytesRead1, buffer1) => {
//             console.log(buffer1.toString());
//         }))
//     }))
// }))
// process.stdin.on('data', (data) => {
//     console.log(data)
// })
// console.log('hello')
// process.stdout.write('hello')
// console.error('wrong')
// process.stderr.write('wrong')

fs.open('./2.txt', 'a', 0o666, ((err, fd) => {
    fs.write(fd, Buffer.from("珠峰"), 0, 3, 3, ((err1, written, buffer) => {
        console.log(written)
    }))
}))
