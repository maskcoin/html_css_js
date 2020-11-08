/*
* async/await号称异步的终极解决方案，是最简单的
* 但是其实它只是generator+promise的语法糖
* */
let fs = require('fs')
let co = require('co')

function readFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            // throw Error('抛出异常异常')
            err ? reject(err) : resolve(data)
        })
    })
}

//如果一个函数中有异步函数，则这个函数前需要加async，如果一个函数返回promise，需要在这个函数调用前加await
/**
 * 1.简洁
 * 2.有很好的语义
 * 3.可以很好的处理异常
 */
// async function read() {
//     let a = await readFile('./1.txt')
//     console.log(a);
//     let b = await readFile('./2.txt')
//     console.log(b);
//     let c = await readFile('./3.txt')
//     console.log(c);
//     return 'OK'
// }


//async await是语法糖，内部还是使用generator和promise实现
function read() {
    return co(function* () {
        let a = yield readFile('./1.txt')
        console.log(a);
        let b = yield readFile('./2.txt')
        console.log(b);
        let c = yield readFile('./3.txt')
        console.log(c);
        return 'OK'
    })
}

read().then(value => {
    console.log(value)
})


