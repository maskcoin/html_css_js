/*
* 递归删除非空目录
* */
let path = require('path')
let fs = require('fs')

//获取 一个目录下面的所有文件或目录
// fs.readdir()
//删除一个文件
// fs.unlink(path)
//删除一个空 目录
// fs.rmdir()

function rmdirp(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log(err)
        } else {
            if (files.length  > 0) {
                for (let file of files) {
                    fs.stat(dir+'/'+file, (err1, stats) => {
                        if (err1) {
                            console.log(err1)
                        } else {
                            if (stats.isDirectory()) {
                                rmdirp(dir+'/'+file)
                            }  else {
                                fs.unlink(dir+'/'+file, err2 => {
                                    if (err2) {
                                        console.log(err2);
                                    }
                                })
                            }
                        }
                    })
                }
            } else {
                fs.rmdir(dir, err1 => {
                    if (err1) {
                        console.log(err1)
                    }
                })
            }
        }
    })
}

rmdirp('a')