/*
*   文件系统（File System）
*       - 文件系统简单来说就是通过node来操作系统中的文件
*       - 使用文件系统，需要先引入fs模块，fs是核心模块，直接引入不需要下载
*
*   同步文件的写入
*       - 手动操作的步骤
*           1.打开文件
*               fs.openSync(path[, flags, mode])
*                   - path 要打开文件的路径
*                   - flags 打开文件要做的操作的类型
*                       r 只读的
*                       w 可写的
*                   - mode 设置文件的权限，一般不传
*               - 该方法会返回一个文件的描述符作为结果，我们可以通过该描述符来对文件进行各种操作
*           2.向文件中写入内容
*               fs.writeSync(fd, string[, position[, encoding]])
*                   - fd 文件的描述符，需要传递要写入的文件描述符
*                   - buffer 要写入的内容
*           3.保存并关闭文件
* */
var fs = require('fs')

//打开文件
var fd = fs.openSync("./hello.txt", 'w')

//向文件中写入内容
fs.writeSync(fd, "今天天气真不错")

//关闭文件
fs.closeSync(fd)

