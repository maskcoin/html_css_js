/*
* 在node.js中通过require方法加载其它模块
* 这个加载是同步的
* 1.找到这个文件
* 2.读取此文件模块的内容
* 3.把它封装在一个函数里执行
* */
// console.log(Object.keys(require.cache))
// var school = require('./school')
// console.log(Object.keys(require.cache))
// var school = require('./school')
// console.log(Object.keys(require.cache))
/*
*   resolve
*   main
*   extensions
*   cache
* */
//当你想知道一个模块的绝对路径的时候，但又不想真正加载它的时候，可以用resolve
// console.log(require)
console.log(require.resolve('./user'))
