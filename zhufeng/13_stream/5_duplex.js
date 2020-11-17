let {Duplex} = require('stream')

let duplex = new Duplex({
    read(size) {
        this.push('a')
        this.push(null)
    },
    write(chunk, encoding, callback) {
        console.log(chunk.toString().toUpperCase());
        callback()
    }
})

process.stdin.pipe(duplex).pipe(process.stdout)