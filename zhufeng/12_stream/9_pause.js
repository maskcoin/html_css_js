let fs = require('fs')
let ReadStream = require('./9_ReadStream')
let rs = new ReadStream('./1.txt', {
    highWaterMark: 3,
    encoding: 'utf8'
})

//在真实的情况下，当可读流创建后会立刻进入暂停模式。会立刻填充缓存区
//缓存区大小是可以看到的
rs.on('readable', () => {
    console.log(rs.length); // 3
    let char = rs.read(1)
    console.log(char);
    console.log(rs.length); // 2
    setTimeout(()=>{
        console.log(rs.length); //5
    }, 500)
})