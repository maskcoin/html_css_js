//spawn
let {spawn} = require('child_process')
let path = require('path')
let p1 = spawn('node', ['test3.js'], {
    cwd: path.join(__dirname, 'test1'),
    stdio: ['ipc', process.stdout, 'ignore']
})

p1.on('message', (message, sendHandle) => {
    console.log(message)
})

//ipc则意味着父子进程之间通过消息进行 通信
p1.send('hello', error => {

})



//每个进程都会有标准输入流 标准输出流 错误输出流 当这些流关闭的时候会触发close事件
p1.on('close', (code, signal) => {
    console.log('子进程1关闭')
})

//当这个进程退出的时候会触发exit事件
p1.on('exit', (code, signal) => {
    console.log('子进程1退出')
})
p1.on('error', err => {
    console.log('子进程1开启失败', err)
})