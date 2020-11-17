/*
* 1.如何把一个unicode码转成utf8编码
*   传进去一个unicode码，返回一个utf8码 万 4E07
* Unicode符号范围     |        UTF-8编码方式
(十六进制)        |              （二进制）
----------------------+---------------------------------------------
0000 0000-0000 007F | 0xxxxxxx
0000 0080-0000 07FF | 110xxxxx 10xxxxxx
0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
* */
function transfer(number) {

}

//0x 16进制

let r = transfer(0x4E07)