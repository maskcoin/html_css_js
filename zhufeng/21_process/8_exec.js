//exec同步执行一个shell命令
let {exec} = require('child_process')
let path = require('path')
//用于使用shell执行命令， 同步
let p1 = exec('node test1.js a b c', {
    cwd: path.join(__dirname, 'test2')
}, (err, stdout, stderr) => {
    if (err) {
        console.log(err)
    } else {
        console.log(stdout)
    }
    // console.log(arguments)
})

p1.kill()

setTimeout(()=>{

}, 10000)

