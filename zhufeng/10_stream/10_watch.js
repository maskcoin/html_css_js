//监视文件的变化，当文件发生变化之后执行对应的回调函数
let fs = require('fs')

fs.watchFile('a.txt', (curr, prev) => {
     if (Date.parse(prev.ctime) === 0) {
         console.log('新增加的文件')
     } else if (Date.parse(curr.ctime) !== Date.parse(prev.ctime)) {
        console.log('文件被修改了')
     } else if (Date.parse(curr.ctime) === 0) {
         console.log('文件被删除了')
     }
})