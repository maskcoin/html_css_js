/*
* 我们现在写一个类，然后可以传入一个文件路径得到类的实例
* 然后我们可以监听它的newLine事件，当这个行读取器每次读到一行的时候，就会向外发射newLine事件，当读到结束的时候会发射end事件
* */
let EventEmitter = require('events')
let util = require('util')
let fs = require('fs')
const NEW_LINE = 0x0a

function LineReader(path) {
    EventEmitter.call(this)
    this._reader = fs.createReadStream(path)
    //当给一个对象添加一个新的监听函数的时候会触发newListener事件
    this.on('newListener', (type, listener) => {
        //如果说你添加了newLine的监听，就开始读取文件内容并按行发射数据
        if (type === 'newLine') {
            //当我们监听了一个可读流的readable的事件，流会调用底层的读取文件的API方法填充缓存区，
            //填充完成之后，向外发射readable事件
            let buffers = []
            this._reader.on('readable', () => {
                let ch
                while (null !== (ch = this._reader.read(1))) {
                    switch (ch[0]) {
                        case NEW_LINE:
                            this.emit('newLine', Buffer.from(buffers))
                            buffers.length = 0
                            break
                        default:
                            buffers.push(ch[0])
                            break
                    }
                }
                this._reader.on('end', ()=>{
                    this.emit('end')
                })
            })
        }
    })
}

util.inherits(LineReader, EventEmitter)

module.exports = LineReader