let {Writable} = require('stream')
let arr = []
let ws = new Writable({
    write(chunk, encoding, cb) {
        arr.push(chunk)
        cb()
    }
})

for (let i = 0; i < 5; i++) {
    ws.write('' + i)
}

ws.end()

setTimeout(() => {
    console.log(arr.toString());
}, 500)