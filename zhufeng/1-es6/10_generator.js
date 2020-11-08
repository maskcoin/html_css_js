/**
 * 生成器函数和普通函数长得不一样，返回迭代器
 * 执行的时候也不一样
 * 生成器函数其实是内部生成了很多个小函数
 * */
function* read(books) {
    console.log('开始')
    for (let i=0;i<books.length; i++) {
        yield books[i] //yield 放弃，屈服，产出
    }
    console.log('结束')
}

let it = read(['js', 'node'])
//
// let r1 = it.next()
// console.log(r1); //{value: 'js', done: false}
//
// let r2 = it.next() //{value: 'node', done: false}
// console.log(r2);
//
// let r3 = it.next()
// console.log(r3);

let result
do {
    result = it.next()
    console.log(result)
} while (!result.done)
