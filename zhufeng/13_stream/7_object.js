let {Transform} = require('stream')
let fs = require('fs')
let rs = fs.createReadStream('./user.json')
//普通流里放的是Buffer，对象 流里放的是对象
let toJSON = new Transform({
    readableObjectMode: true, //就可以向可读流里放对象了
    transform(chunk, encoding, callback) {
        //向可读流的里放
        this.push(JSON.parse(chunk.toString()))
    }
})

let outJSON = new Transform({
    readableObjectMode: true, //就可以向可读流里放对象了
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
        console.log(chunk)
    }
})

rs.pipe(toJSON).pipe(outJSON)