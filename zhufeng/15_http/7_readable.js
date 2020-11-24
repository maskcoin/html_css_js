let fs = require('fs')
let rs = fs.createReadStream('./1.txt', {
    highWaterMark: 3
})

rs.on('readable', () => {
    //把缓存区清空
    let data = rs.read()
    console.log(data)
})