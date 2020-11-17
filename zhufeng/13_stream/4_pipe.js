let {Writable, Readable} = require('stream')
let i = 0
let rs = new Readable({
    highWaterMark: 2,
    read(size) {
        if (i < 10) {
            this.push('' + i++)
        } else {
            this.push(null)
        }
    }
})

let ws = new Writable({
    highWaterMark: 2,
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback()
    }
})

// rs.on('data', chunk => {
//     console.log(chunk.toString());
// })

rs.pipe(ws)
setTimeout(()=>{
    console.log(rs._readableState.length);
    console.log(ws._writableState.length);
}, 500)