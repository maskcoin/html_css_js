/*
* push：向数组末尾增加内容
* @params
*   多个任意类型
* @return
*   新增后数组的长度
* */
// let ary = [10, 20]
// let res = ary.push(30, 'AA', {name:'珠峰培训'})
// console.log(res, ary)
//
// ary[ary.length] = 40
// console.log(ary.length, ary)

/*
* unshift：向数组开始位置增加内容
* @params
*   多个任意类型
* @return
*   新增后数组的长度
* */
// let ary = [10, 20]
// let res = ary.unshift(30, 'AA')
// console.log(res, ary)
//
// ary = [100, ...ary]
// console.log(ary)

/*
* shift：删除数组中的一项
* @params
* @return
*   删除的那一项
* */
// let ary = [10, 20, 30, 40]
// let res = ary.shift()
// console.log(res, ary)

/*
* pop：删除数组中的一项
* @params
* @return
*   删除的那一项
* */
// let ary = [10, 20, 30, 40]
// let res = ary.pop()
// console.log(res, ary)

// 基于原生JS让数组长度干掉一位，默认会干掉最后一项
// ary.length--
// console.log(ary)

/*
* splice：实现数组的增加、删除和修改
* @params
*   n,m 都是数字    从索引n开始，删除m个元素（m不写是删除到末尾）
* @return
*   把删除的部分，用新数组存储起来返回
* */

// let ary = [10, 20, 30, 40, 50, 60, 70, 80, 90]
// let res = ary.splice(2, 4)
// console.log(res, ary)
//
// res = ary.splice(0)
// console.log(res, ary)

/*
* splice：实现数组的增加和修改
* @params
*   n,m,x 都是数字    从索引n开始，删除m个元素，用x占用删除的部分
*   n,0,x 从索引n开始 ，一个都不删，把x放到索引n的前面
* @return
*   把删除的部分，用新数组存储起来返回
* */

// let ary = [10, 20, 30, 40, 50]
// let res = ary.splice(1,2, '珠峰培训', '哈哈哈')
// console.log(res, ary)

// 实现增加
// ary.splice(3, 0, '呵呵呵')
// console.log(ary)

// 向数组末尾追加
// ary.splice(ary.length, 0, 'AAA')
// console.log(ary)

// 想数组开始追加
// ary.splice(0, 0, 'BBB')
// console.log(ary)

// let ary = [10, 20, 30, 40, 50]
// let res = ary.splice(1,2, '珠峰培训', '哈哈哈')
// console.log(res, ary)

/*
* slice：实现数组的查询
* @params
*   n,m 都是数字    从索引n开始，找到索引为m的地方（不包含m这一项）
* @return
*   把找到的内容，以一个新数组返回
* */

// let ary = [10, 20, 30, 40, 50]
// let res = ary.slice(1,3)
// console.log(res, ary)
//
// // m不写是找到末尾
// res = ary.slice(1)
// console.log(res)
//
// // 数组的浅拷贝，参数0不写也可以
// res = ary.slice(0)
// console.log(res)

/*
* concat：实现数组的拼接
* @params
*   多个任意类型值
* @return
*   拼接后的新数组（原来数组不变）
* */

// let ary1 = [10, 20, 30]
// let ary2 = [40, 50, 60]
// let res = ary1.concat('珠峰培训', ary2)
// console.log(res)

/*
* toString：把数组转换为字符串
* @params
* @return
*   转换后的字符串（原来数组不变）
* */

// let ary = [10, 20, 30]
// let res = ary.toString()
// console.log(res) //=>"10,20,30"
// console.log([].toString()) //=>""
// console.log([12].toString()) //=>"12"

/*
* join：把数组转换为字符串
* @params
*   指定的分隔符（字符串格式）
* @return
*   转换后的字符串（原来数组不变）
* */

// let ary = [10, 20, 30]
// let res = ary.join()
// console.log(res) //=>"10,20,30"
//
// ary = [10, 20, 30]
// res = ary.join('|')
// console.log(res) //=>"10|20|30"
//
// ary = [10, 20, 30]
// res = ary.join('+') //=>"10+20+30"
// console.log(res) //=>60 eval把字符串变为JS表达式执行//能够执行得到结果的叫表达式

/*
* indexOf/ lastIndexOf：检测当前项在数组中第一次或者最后一次出现位置的索引值
* @params
*   要检索的这一项内容
* @return
*   这一项出现的位置索引值（数字），如果数组中没有这一项，返回结果是-1
* */

// let ary = [10, 20, 30, 10, 20, 30]
// console.log(ary.indexOf(20)) //=>1
// console.log(ary.lastIndexOf(20)) //=>4
//
// if (ary.indexOf('珠峰培训') === -1) {
//     //不包含
// }
//
// // 也可以直接使用ES6新提供的includes方法判断
// if (ary.includes('珠峰培训')) {
//     // 包含：如果存在返回的是TRUE
// }

//========================================================

/*
* reverse：把数组倒过来排列
* @params
* @return
*   排列后的新数组，原来数组改变
* */
// let ary = [12, 15, 9, 28, 10, 22]
// ary.reverse()
// console.log(ary) //=>[22, 10, 28, 9, 15, 12]

/*
* sort：实现数组的排序
* @params
*   可以没有，也可以是一个函数
* @return
*   排列后的新数组，原来数组改变
* */

//SORT方法中如果不传递参数，是无法处理10以上数字排序的（它默认按照每一项的第一个字符来排序，不是我们想要的效果）
// let ary = [12, 15, 9, 28, 10, 22]
// ary.sort()
// console.log(ary) //=>[10, 12, 15, 22, 28, 9]

// 想要实现多位数正常排序，需要给SORT传递一个函数，函数中返回a-b实现升序，返回b-a实现降序
// let ary = [12, 15, 9, 28, 10, 22]
// a和b是相邻的两项
// ary.sort((a, b) => a - b)
// console.log(ary)


//============================================
/*
* forEach：遍历数组中的每一项内容
* @params
*   函数
* @return
*   原来数组不变
* */
let ary = [12, 15, 9, 28, 10, 22]
// 基于原生JS中的循环可以实现需求
// for (let i = 0; i < ary.length; i++) {
//     console.log(ary[i])
// }

ary.forEach((item, index) => {
    // 数组中有多少项，函数就会被默认执行多少次
    // 每一次执行函数：item是数组中当前要操作的这一项 ，index是当前项的索引
    console.log('索引：' + index + ' 内容：' + item)
})







