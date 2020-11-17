//只想知道模块的路径，但又不想加载这个模块
console.log(require.resolve('./school.js'))
//main主要的，其实指的就是入口模块
// console.log(require.main)
/*
* 在node里模块的类型有三种
* 1.JS模块
* 2.json模块
* 先找到文件，读取文件内容，JSON.parse转成对象返回
* 3.node模块 C++扩展二进制模块
* 这属于二进制模块
* 当require加载一个文件时，会先找user，如果找不到，会找user.js，如果还找不到，会找user.json，如果还找不到，会找user.node
* */
let user = require('./user')
console.log(user)
console.log(this  === module.exports)
console.log(require.extensions);