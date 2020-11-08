let util = require('util')
let obj = {name:'zbc', home:{city:{name: 'beijing'}}}

console.log(obj)
console.log(util.inspect(obj, {depth:1}))
