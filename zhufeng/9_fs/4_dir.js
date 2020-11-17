//如何创建目录
let fs = require('fs')
// fs.mkdir('./a/b', err => {
//     console.log(err)
// })
// fs.access('./a', fs.constants.R_OK, err => {
//     console.error(err)
// })

//递归异步创建目录
function mkdirp(dir) {
    let paths = dir.split('/')
    !function next(index) {
        if (index > paths.length) {
            return
        }
        let current = paths.slice(0, index).join('/')
        fs.access(current, fs.constants.R_OK, err => {
            if (err) {
                fs.mkdir(current, err1 => {
                    if (err1) {
                        console.error(err1)
                    } else {
                        next(index + 1)
                    }
                })
            } else {
                next(index + 1)
            }
        })
    }(1)
}

mkdirp('./a/b/c')