let fs = require('fs')
let path = require('path')

/*
* 删除文件 fs.unlink
* 删除文件夹 fs.rmdir 这一定是一个空目录
* */

function rmdirSync(dir) {
    let files = fs.readdirSync(dir)
    for (let file of files) {
        let stat = fs.statSync(path.join(dir, file))
        if (stat.isDirectory()) {
            rmdirSync(path.join(dir, file))
        } else {
            fs.unlinkSync(path.join(dir, file))
        }
    }
    fs.rmdirSync(dir)
}

//异步递归删除非空文件夹
function rmp(filename) {
    return new Promise((resolve, reject) => {
        fs.stat(filename, (err, stats) => {
            if (stats.isDirectory()) {
                fs.readdir(filename, (err1, files) => {
                    if (files.length === 0) {
                        fs.rmdir(filename, err2 => {
                            if (!err2) {
                                resolve()
                            }
                        })
                    } else {
                        Promise.all(files.map(item => rmp(path.join(filename, item)))).then(()=>{
                            fs.rmdir(filename, err2 => {
                                if (!err2) {
                                    resolve()
                                }
                            })
                        })
                    }
                })
            } else {
                fs.unlink(filename, err1 => {
                    if (!err1) {
                        resolve()
                    }
                })
            }
        })
    })
}

rmp('a')