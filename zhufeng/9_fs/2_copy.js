//为了实现节约内存的拷贝，读一点写一点
let fs = require('fs')

const BUFFER_SIZE = 3

function copy(src, target) {
    fs.open(src, 0o666, (err, readFd) => {
        fs.open(target, 'w', 0o666, (err, writeFd)=>{
            let buff = Buffer.alloc(BUFFER_SIZE)
            !function next() {
                fs.read(readFd, buff, 0, BUFFER_SIZE, null, ((err1, bytesRead, buffer) => {
                    if (bytesRead > 0) {
                        fs.write(writeFd, buff, 0, bytesRead, (err2, written, buffer1) => {
                            next()
                        })
                    } else {
                        fs.fsync(readFd, ()=>{
                            console.log('关闭')
                        })
                        
                        fs.close(readFd, ()=>{
                            console.log('target文件关闭')
                            fs.close(writeFd, ()=>{
                                console.log('src文件关闭')
                            })
                        })
                    }
                }))
            }()
        })
    })
}

copy('1.txt', '2.txt')