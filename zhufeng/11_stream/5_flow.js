let fs = require('fs')
/*
*所有初始工作模式为 paused 的 Readable 流，可以通过下面三种途径切换到 flowing 模式：
监听 'data' 事件
调用 stream.resume() 方法
调用 stream.pipe() 方法将数据发送到 Writable
* */
let rs = fs.createReadStream('./1.txt', {
    highWaterMark: 3
})

// rs.on('data', chunk => {
//
// })
//当你监听readable事件的时候，会进入paused模式
rs.on('readable', () => {
    console.log(rs._readableState.length);
    //read如果不加参数表示读取整个缓存区数据
    //读取一个字节，如果可读流发现你要读的字节小于等于缓存字节大小
    let ch = rs.read(1)
    console.log(ch);
    console.log(rs._readableState.length);
    //当你读完指定的字节后，如果可读流发现剩下的字节已经比最高水位线小了，则会立马再次读取填满最高水位线
})


