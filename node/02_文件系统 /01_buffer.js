/*
* Buffer（缓冲区）
*   - Buffer的结构和数组很像，操作的方法也和数组类似
*   - 数组中不能存储二进制文件，而buffer就是专门用来存储二进制数据的
*   - 使用buffer不需要引入模块，直接使用即可
*   - 在buffer中存储的都是二进制数据，但是在显示时都是以16进制的形式显示
*
*   - Buffer的大小一旦确定，则不能修改，Buffer实际是对底层内存的直接操作
* */
var str = "Hello 尚硅谷"

//将一个字符串保存到buffer中
var buf = Buffer.from(str)

// console.log(buf)
// console.log(buf.length) //占用内存的大小
// console.log(str.length) //字符串的长度

// var buf2 = new Buffer(10) //10个字节的buf
// console.log(buf2.length)
var buf2 = Buffer.alloc(10)
//通过索引，来操作buf2中的数据
buf2[0] = 88
buf2[1] = 255
buf2[2] = 0xaa
buf2[3] = 256

// console.log(buf2[2].toString(16))
//
// for (var i = 0; i < buf2.length; i++) {
//     console.log(buf2[i])
// }

// var buf3 = Buffer.allocUnsafe(10)
// console.log(buf3)

var buf4 = Buffer.from("我是一段文本数据")
console.log(buf4.toString())