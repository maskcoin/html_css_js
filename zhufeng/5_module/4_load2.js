/*当不加./路径符号时，会在当前模块的查找路径下找，如果找不到会到全局路径下找，全局路径是$NODE_PATH对应的路径
[
  '/Users/xuchanghui/html_css_js/zhufeng/5_module/node_modules',
  '/Users/xuchanghui/html_css_js/zhufeng/node_modules',
  '/Users/xuchanghui/html_css_js/node_modules',
  '/Users/xuchanghui/node_modules',
  '/Users/node_modules',
  '/node_modules'
]
*/

let load = require('./user')
console.log(load)
console.log(module.paths);
