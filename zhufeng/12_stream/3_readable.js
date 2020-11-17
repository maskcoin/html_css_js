let fs = require('fs')
let rs = fs.createReadStream('./1.txt', {
    highWaterMark: 3
})
//立刻从文件中读取highWaterMask数据，读完之后填充缓存区，然后emit，readable事件，
rs.on('readable', () => {
    let ch = rs.read(1)
    console.log(ch);
    setTimeout(()=>{
        console.log(rs._readableState.length)
    }, 200)
})