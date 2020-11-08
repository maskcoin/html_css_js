let fs = require('fs')
let co = require('co')

function readFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

function* read() {
    console.log('开始')
    //await后面必须跟一个promise
    let a = yield readFile('./1.txt')
    console.log(a)
    let b = yield readFile('./2.txt')
    console.log(b)
    let c = yield readFile('./3.txt')
    console.log(c)
    return c
}

// co(read)
//tJco是用来帮我们自动执行迭代器的
function co(gen) {
    let it = gen() //我们要让生成器持续执行
    return new Promise((resolve, reject) => {
        (function next(lastVal) {
            try {
                let {value, done} = it.next(lastVal)
                if (done) {
                    resolve(value)
                } else {
                    if (value instanceof Promise) {
                        value.then(next, reject)
                    } else {
                        Promise.resolve(value).then(next, reject)
                    }
                }
            } catch (e) {
                // console.error(e)
                reject(e)
            }
            
        })()
    })
}

co(read).then(value => console.log(value))

//调用生成器，返回迭代器
// let it = read()
//
// let r1 = it.next()
// // console.log(r1)//{value, done}
// r1.value.then(data1 => {
//     let r2 = it.next(data1)
//     r2.value.then(data2 => {
//         let r3 = it.next(data2)
//         r3.value.then(data3 => {
//             let r4 = it.next(data3)
//             console.log(r4)
//         })
//     })
// })

