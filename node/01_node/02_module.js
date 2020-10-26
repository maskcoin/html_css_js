/*
*   模块化：
*       - 在node中，一个js文件就是一个模块
*       - 在node中，每一个js文件中的js代码都是独立运行在一个函数中的
*           而不是全局作用域，所以一个模块中的变量和函数在其他模块中无法访问
* */

console.log('我是一个模块，我是02_module.js')

/*
* 我们可以通过exports来向外部暴露变量和方法
*   只需要将需要暴露给外部的变量或方法设置为exports的属性即可
* */
exports.x = "我是02_module.js中的x"
exports.y = "我是02_module.js中的y"
exports.fn = function () {

}
