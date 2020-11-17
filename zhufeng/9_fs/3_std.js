console.log('hello')
console.error('wrong')
let fs = require('fs')
fs.write(1, Buffer.from('a'), 0,  1, (err, written, buffer) => {
    console.log(written)
})