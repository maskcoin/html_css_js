let fs = require('fs')
let rs = fs.createReadStream('./1.txt', {
    start: 3,
    end: 8,
    highWaterMark: 8
})

rs.on('data', chunk => {
    console.log(chunk.toString())
})

rs.on('end', () => {

})

rs.on('error', err => {

})

rs.on('open', fd => {

})

rs.on('close', () => {

})