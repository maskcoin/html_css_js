//定义一个类
/*
* 以前JS里类和构造函数是一体的
* 类里可以定义构造函数，当你创建一个类的实例的时候就会调用构造函数
* */
class Parent {
    constructor(name) {
        this.name = name
    }

    //__proto__上的属性
    getName() {
        console.log(this.name)
    }
}

let p = new Parent('bitcoin')
p.getName()