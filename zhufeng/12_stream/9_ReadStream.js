let fs = require('fs')
let EventEmitter = require('events')

class ReadStream extends EventEmitter {
    constructor(path, options) {
        super(path, options);
        this.path = path
        this.flags = options.flags || 'r'
        this.mode = options.mode || 0o666
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.start = this.pos = options.start || 0
        this.end = options.end
        this.encoding = options.encoding
        this.autoClose = options.autoClose || true
        this.buffer = Buffer.alloc(this.highWaterMark)
        //这才是真正的缓存
        this.buffers = []
        this.length = 0
        this.open() //准备打开文件读取

        //当给这个实例添加了任意的监听函数时会触发
        this.on('newListener', (type, listener) => {
            //如果监听了data事件，流会自动切换到流动模式
            if (type === 'data') {
                this.flowing = true
                this.read()
            }
        })
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.fd = fd
                if (this.autoClose) {
                    this.destroy()
                    this.emit('error', err)
                    return
                }
            } else {
                this.fd = fd
                this.emit('open')
                this.read()
            }
        })
    }

    read(n) {
        let ret
        let m = n
        //缓存区数据足够用，并且要读取的字节大于0
        if (0 < n < this.length) {
            ret = Buffer.alloc(n)
            let index = 0
            let b;
            while (m > 0 && null != (b = this.buffers.shift())) {
                for (let i = 0; i < b.length; i++) {
                    ret[index++] = b[i]
                    m--
                    if (index === n) { //填充完毕
                        if (i !== b.length - 1) {
                            let buf = b.slice(i + 1, b.length)
                            this.buffers.unshift(buf)
                        }
                        this.length -= n
                        ret = this.encoding ? ret.toString(this.encoding) : ret
                        break
                    }
                }
            }
        }

        if (this.length < this.highWaterMark) {
            fs.read(this.fd, this.buffer, 0, this.highWaterMark, null, (err, bytesRead, buffer) => {
                if (bytesRead > 0) {
                    let b = this.buffer.slice(0, bytesRead)
                    this.buffers.push(b)
                    this.length += bytesRead
                    this.emit('readable')
                } else {
                    this.emit('end')
                }
            })
        }

        return ret
    }
}

module.exports = ReadStream