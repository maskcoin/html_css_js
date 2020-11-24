let zlib = require('zlib')
let str = "hello"
zlib.gzip(str, (error, result) => {
    console.log(result.length)
    zlib.gunzip(result, (error1, result1) => {
        console.log(result1.toString())
    })
})