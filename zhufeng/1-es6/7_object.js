// let name = 'zfpx'
// let age = 9
// let obj = {name, age}

let obj1 = {
    age: 1,
    getFood() {
        return '面包'
    }
}
// let obj2 = {age: 2}
let obj3 = {
    __proto__: obj1,
    getFood() {
        //super可以调用原型链上的方法
        return "niunai" + super.getFood()
    }
}
// Object.setPrototypeOf(obj3, obj1)
// console.log(obj3.age)

//super

console.log(obj3.getFood())