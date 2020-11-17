let {Transform} = require('stream')

//转换流是实现数据转换的
let t = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase())
        callback()
    }
})
process.stdin.pipe(t).pipe(process.stdout)