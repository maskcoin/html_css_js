let MyPromise = require('./Promise')
let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        let num = Math.random()
        if (num < .5) {
            resolve(num)
        } else {
            reject
        }
    })
})

p1.then(value => {
    console.log(value)
}, reason => {
    console.error(reason)
})