/*
* var
* 1.可以重复声明
* 2.不能定义常量 var PI =
* 3.不支持块级作用域 if(true) {var a = 10;}
* */
// SyntaxError: Identifier 'a' has already been declared
// let a = 10;
// let a = 20;

// const PI = 3.14
//试图给一个常量赋值
// PI = 3.15

// if (true) {
//     let a = 10;
// }
//
// console.log(a)

//以前JS只有两个作用域，一个全局，一个函数级
// let a = 20
// ;(function () {
//
// })();
//
// {
//     console.log(a)
//     let a = 10
// }

for (let i = 0; i< 3; i++) {
    setTimeout(function () {
        console.log(i)
    }, 1000)
}
// const PI = 3.14
// console.log(PI)

//虽说常量不能再引用别的对象了，但是它的值如果是一个引用类型的话，引用对象的属性还是可以改变的
// const USER = {name: 'zfpx'}
// USER.name = "zfpx2"


