/*
* 学习一个node中非常重要的模块叫events
* 在node里面，node是基于事件驱动
* */

let EventEmitter = require('events')
let util = require('util')
// console.log(util);

//这是一个类
function Bell() {
    EventEmitter.call(this) //继承私有属性
}

//进行原型继承 继承共有
//ObjectSetPrototypeOf(ctor.prototype, superCtor.prototype);
util.inherits(Bell, EventEmitter)

let bell = new Bell()
function studentInClassRoom(roomNumber, things) {
    console.log(`学生带着${things}进${roomNumber}教室`)
}

function teacherInClassRoom(roomNumber, things) {
    console.log(`老师带着${things}进${roomNumber}教室`)
}

function masterInClassRoom(roomNumber, things) {
    console.log(`校长带着${things}进${roomNumber}教室`)
}
bell.addListener('响', studentInClassRoom)
bell.on('响', teacherInClassRoom)
bell.once('响', masterInClassRoom)

console.log('=======================================')
bell.setMaxListeners(0)
//第一个参数是事件类型，第二个参数和以后的参数会传递给监听函数
bell.emit('响', 301, '书')
bell.removeAllListeners('响')
bell.emit('响', 301, '书')
console.log(bell.listeners('sex'))
// setImmediate(()=>{
//
// })

