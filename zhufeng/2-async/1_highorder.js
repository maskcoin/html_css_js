/*
* 1.在JS里，函数是一等公民，可以作为函数的返回值，也可以作为函数的参数
* */

//判断一个参数是否是字符串
function isString(param) {
    return Object.prototype.toString.call(param) === '[object String]'
}
//判断一个参数是否是数组
function isString(param) {
    return Object.prototype.toString.call(param) === '[object Array]'
}

//函数可以作为返回值
function isType(type) {
    return function (param) {
        return Object.prototype.toString.call(param) === `[object ${type}]`
    }
}

// console.log(isString({}))
// console.log(isString([]))

console.log(isType('String')({}))
console.log(isType('Array')([]))

//lodash after 指定一个函数被调用多少次才会真正执行
function eat() {
    console.log('吃完了')
}

function after(times, fn) {
    let total = 0
    return function () {
        total++
        if (total === times) {
            fn()
        }
    }
}

let newEat = after(3, eat)
newEat()
newEat()
newEat()


