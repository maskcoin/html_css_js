/*
* global全局对象
* 1.global的变量都是全局变量
* 2.所有的全局变量都是global的属性
* */
console.log(process.cwd())
process.chdir('../')
console.log(process.cwd())
/*
* {
  rss: 22654976, //常驻内存
  heapTotal: 4513792, //堆内存的总申请量
  heapUsed: 2456984, //已经使用的量
  external: 828902 //外部内存的使用量
}
* */
console.log(process.memoryUsage())