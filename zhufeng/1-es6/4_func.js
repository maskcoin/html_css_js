/*
* 函数
* */

//1 默认参数 1.必填项不填报错 2.有些参数没有给传参的话，可以有默认值
// function ajax(url = new Error('url不能为空'), method = 'GET', dataType = 'json') {
//     console.log(url);
//     console.log(method);
//     console.log(dataType);
// }

// function sum(prefix, ...rest) {
//     //1.循环求和
//     let result = 0
//
//     rest.forEach(function (item) {
//         result += item
//     })
//     //reduce 计算，汇总，收敛 把一个数组中的一堆值计算出来一个值
//
//     return prefix + result
// }

// console.log(sum('$', 1, 2, 3, 4))

// let arr4 = [1, 2, 3]
//平均值
// let result = arr4.reduceRight(function (val, item, index, origin) {
//     let sum = val + item; // 返回值会成为下一次函数执行时候的val
//     if (index == 0) {
//         return sum / origin.length
//     } else {
//         return sum
//     }
// }, 0)

// console.log(result)

// 展开运算符
// let arr5 = [1, 2, 3]
// let arr6 = [4, 5, 6]
// let arr7 = [...arr5, ...arr6]
// console.log(arr7)

// let arr8 = [4, 5, 6]
// let max = Math.max(...arr8)
// console.log(max);

// let obj1 = {name: '1'}
// let obj2 = {age: 2}
// let obj3 = {...obj1, ...obj2}

let obj5 = {
    name: 'zfpx', age: 6, home: {
        city: 'beijing'
    }
}

let obj6 = {}
// obj6 = Object.assign(obj6, obj5)
obj6 = JSON.parse(JSON.stringify(obj5))
obj6.name = 'maskcoin'
obj6.home.city = 'guangzhou'
console.log(obj5)
console.log(obj6)

let ary = [1, 2, 3]
console.log(typeof ary)
