/*
*   同步、异步、简单文件的写入都不适合大文件的写入
* */
var fs = require("fs")

//流式文件写入
//创建一个可写流
var ws = fs.createWriteStream('./hello4.txt')

//可以通过监听流的open和close事件来监听流的打开和关闭
ws.once("open", function () {
    console.log('流打开了~~~')
})

ws.once('close', function () {
    console.log('流关闭了～～')
})

//通过ws向文件中输出内容
ws.write("通过可写流写入文件的内容")
ws.write("今天天气真不错")
ws.write("醋和日当午")
ws.write("红掌拨清波")
ws.write("青青真漂亮")

// ws.close() //不能用close
ws.end()