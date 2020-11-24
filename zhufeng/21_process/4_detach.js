//detach 默认情况下父进程要等待所有的子进程全部退出后才能退出，当时 如果为子进程设置了detach=true，则此进程可脱离父进程
let {spawn} = require('child_process')
let fs = require('fs')
let path = require('path')
let fd = fs.openSync(path.join(__dirname, 'msg.txt'), 'w')

let p1 = spawn('node', ['test4.js'], {
    cwd: path.join(__dirname, 'test1'),
    detached: true,
    stdio: ['ignore', fd, 'ignore']
})

//让父进程先退出
p1.unref()

