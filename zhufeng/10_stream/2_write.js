let str = '珠峰'
let fs = require('fs')
fs.open('./2.txt', 'w', 0o666, (err, fd) => {
    let buff = Buffer.from(str)
    fs.write(fd, buff, 0, 3, null, (err1, written, buffer) => {
        console.log(written);
        fs.write(fd, buff, 3, 3, null, (err2, written1, buffer1) => {
            fs.fsync(fd, err3 => {
                fs.close(fd, err4 => {
                    console.log('关闭文件完成')
                })
            })
        })
    })
})