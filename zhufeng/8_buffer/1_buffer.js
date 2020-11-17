//表示分配一个长度为6个字节的Buffer
//会把所有的字节设置为0
//可以提供默认值
// let buf1 = Buffer.alloc(6, 2)
// console.log(buf1)
//分配一块没有初始化的内存
// let buf2 = Buffer.allocUnsafe(6)
// console.log(buf2);
// let buf3 = Buffer.from('珠峰')
// console.log(buf3);
//
// let buf4 = Buffer.from([188, 2, 3])
// console.log(buf4);

// let buf5 = Buffer.alloc(6)
// buf5.fill(3, 1, 3)
// console.log(buf5);
// buf5.write("珠峰", 0, 3)
// console.log(buf5.toString());
// buf5.write("峰", 3, 3)
// console.log(buf5.toString());
// let buf5 = Buffer.alloc(6)
// buf5.writeInt8(0, 0)
// buf5.writeInt8(16, 1)
// buf5.writeInt8(32, 2)
// console.log(buf5); //[00,10,20,00,00,00]

// let buf6 = Buffer.alloc(4)
// Big Endian 大头在前
// Little Endian 小头在前
// buf6.writeInt16BE(256, 0)
// let be = buf6.readInt16BE(0)
// console.log(be);
// buf6.writeInt16LE(256, 2)
// let se = buf6.readInt16LE(2)
// console.log(se);
//
// console.log(buf6.toString());

// let buf7 = Buffer.alloc(6, 1)
// let buf8 = buf7.slice(2, 6)
// console.log(buf8);
// buf8.fill(4)
// console.log(buf8);
// console.log(buf7);
/*
* string_decoder
* 它的出现是为了解决乱码问题
* */
let buf9 = Buffer.from('珠峰培训')
let buf10 = buf9.slice(0, 5) //5
let buf11 = buf9.slice(5) //7
let {StringDecoder} = require('string_decoder')
let sd = new StringDecoder()
// console.log(buf10.toString());
//write就是读取buffer的内容，返回一个字符串
//write的时候会判断是不是一个字符，如果是的话就输出，不是的话则缓存在对象内部，等下次write的时候会把前面缓存的字符加
//到第二次write的buffer上再进行判断
console.log(sd.write(buf10));
console.log(sd.write(buf11));
