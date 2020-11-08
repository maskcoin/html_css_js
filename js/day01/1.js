// console.log(typeof NaN === 'number')
// console.log('AA' == NaN)
// console.log(10 == NaN)
// console.log(NaN == NaN) 
// console.log(isNaN(10)) //=>false
// console.log(isNaN('AA')) //=>true
// console.log(isNaN('10')) //=>false

// ===============Number======================
// console.log(Number('12.5')) //=>12.5
// console.log(Number('12.5px')) //=>NaN
// console.log(Number('12.5.')) //=>NaN
// console.log(Number(''))

// console.log(Number(true))
// console.log(Number(false))
// console.log(isNaN(false))
// console.log(Number(null))//=>0
// console.log(Number(undefined))//=>NaN

// 把引用数据类型转换为数字，是先把它基于toString方法转换为字符串，然后再转换为数字
// console.log(Number({ name: 'xxx' }))
// console.log(Number({}))
// console.log(Number([]))//=>0
// console.log(Number([12]))//=>12
// console.log(Number([12, 13]))//=>NaN

let str = '12.5px'
// console.log(Number(str)) // NaN
console.log(parseInt(str))
console.log(parseFloat(str))

