/*
* charAt：根据索引获取指定位置的字符
* charCodeAt：获取指定字符的ASCII码值（Unicode编码值）
*  @params
*       n [number] 获取字符指定的索引
*  @return
*      返回查找到的字符
*      找不到返回的是空字符串，不是undefined，或者对应的编码值
* */

// let str = 'zhufengpeixunyangfanqihang'
// console.log(str.charAt(0)) //=>'z'
// console.log(str[0]) //=>'z'
// console.log(str.charAt(1000000)) //=>''
// console.log(str[1000000]) //=>undefined
//
// console.log(str.charCodeAt(0)) //=>122
// console.log(String.fromCharCode(122)) //=>'z'

/*
* 都是为了实现字符串截取（在原来字符串中查找到自己想要的）：
*   substr(n, m)：从索引n开始截取m个字符，m不写是截取到末尾（后面方法也是）
*   substring(n, m)：从索引n开始找到索引为m处（不含m）
*   slice(n, m)：和substring一样，都是找到索引为m处，但是slice可以支持负数作为索引，其余2个是不可以的
* */
// let str = 'zhufengpeixunyangfanqihang'
// console.log(str.substr(3, 7)) //=>fengpei
// console.log(str.substring(3, 7)) //=>feng
// console.log(str.substr(3))
// console.log(str.substring(3, 10000))

/*
* 验证字符是否存在
*   indexOf(x, y)：获取x第一次出现位置的索引，y是控制查找的起始位置索引
*   lastIndexOf(x)：最后一次出现的位置的索引=>没有这个字符，返回的结果是-1
* */

/*
* 验证字符是否存在
*   indexOf(x, y)：获取x第一次出现位置的索引，y是控制查找的起始位置索引
*   lastIndexOf(x)：最后一次出现的位置的索引=>没有这个字符，返回的结果是-1
* */

/*
* split([分隔符])：把字符串按照指定的分隔符拆分成数组（和数组中join对应）
* */
// let str = 'music|movie|eat|sport'
// let ary = str.split('|')
// str = ary.join(',')
// console.log(str)

/*
*   replace(老字符，新字符)：实现字符串的替换（经常伴随正则来应用）
*
* */
let str = '珠峰@培训@扬帆起航'
// str = str.replace('@', '-')//珠峰-培训@扬帆起航
// console.log(str)
str = str.replace(/@/g, '-')
console.log(str)


