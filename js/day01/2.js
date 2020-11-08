// let a = 12
// console.log(a.toString()) //=>'12'
// console.log((13).toString())
// console.log((NaN).toString()) //=>NaN
// console.log()

//======================字符串拼接
//四则运算法则中，除加法之外，其余都是数学计算，只有加法可能存在字符串拼接（一旦遇到字符串，则不是数学运算，而是字符串拼接）
// console.log('10' + 10)
// console.log('10' - 10)
// console.log('10px' - 10)//NaN
let a = 10 + null + true + [] + undefined + '珠峰' + null + [] + 10 + false;
console.log(a)