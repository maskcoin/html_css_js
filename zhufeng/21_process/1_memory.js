/*
* process.memoryUsage()
*
* node v8引擎内存使用量是有上限的，64位最多大概1.7G
* {
  rss: 19283968, //常驻内存
  heapTotal: 4333568, //堆的总申请量
  heapUsed: 2420456, //堆的使用量
  external: 800208, //外部的内存使用量 Buffer.alloc()的内存是单独分配的，属于external，不属于v8引擎
  arrayBuffers: 9386
}
* */
// console.log(process.memoryUsage())

//node一般不是很健壮，处理错误非常重要
setTimeout(()=>{
    console.log('hello')
}, 3000)

//专门用来捕获未处理的异常
//有可能引起内存泄漏等问题
process.on('uncaughtException', error => {
    console.log('哈哈')
})

// try {
    nomethod()
// } catch (e) {
//     console.error(e)
// }

