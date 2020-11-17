/*
* 以前的JS只需要处理字符
* 如何实现进制的转换
* */
let a = 0b10100
console.log(a);
let b = 0o24
console.log(b);
let c = 20
let d = 0x14
console.log(d);
//如何把任意进制转换为10进制
console.log('================================')
console.log(parseInt('10100', 2))
console.log(parseInt('14', 16))
//如何把十进制转成任意进制呢？
console.log('================================')
console.log(c.toString(2))
//八进制 转成十六进制
console.log(b.toString(16))



