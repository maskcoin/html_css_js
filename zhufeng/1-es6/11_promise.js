/*
*Promise是一个类，可以创建实例
* 代表承若，什么时候会用到承若，一般是异步任务，就是需要以后才能执行的任务
* */
let Promise1 = require('./Promise')
let p = new Promise1((resolve, reject) => {
    setTimeout(() => {
        // let num = Math.random()//生成一个随机数
        // if (num > .5) {
        //     resolve('大成功')
        // } else {
        //     reject('小失败')
        // }
        reject(100)
    }, 1000)
})

//成功的回调里又返回了新的promise
//成功的回调里返回的promise还不是我自己写的promise
p.then(value => new Promise(
    (resolve, reject) => {
        setTimeout(function () {
            resolve(new Promise(function () {
                setTimeout(function () {
                    resolve(value+100)
                }, 1000)
            }))
        }, 1000)
    }
))

p.then(value => console.log('成功2', value)
    , reason => console.log('失败2', reason)
)
