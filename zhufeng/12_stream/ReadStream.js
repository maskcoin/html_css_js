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

    read() {
        if (typeof this.fd !== 'number') {
            this.once('open', () => this.read())
            return
        }
        let howMuchToRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark
        fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytesRead, buffer) => {
            if (err) {
                if (this.autoClose) {
                    this.destroy()
                    this.emit('error', err)
                    return
                }
            } else {
                if (bytesRead > 0) {
                    let data = buffer.slice(0, bytesRead)
                    data = this.encoding ? data.toString(this.encoding) : data
                    this.emit('data', data)
                    this.pos += bytesRead
                    if (this.end && this.pos > this.end) {
                        this.emit('end')
                        this.destroy()
                        return
                    } else {
                        if (this.flowing) {
                            this.read()
                        }
                    }
                } else {
                    this.emit('end')
                    this.destroy()
                    return
                }
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
            }
        })
    }

    destroy() {
        fs.close(this.fd, err => {
            this.emit('close')
        })
    }

    pipe(ws) {
        this.on('data', data => {
            let flag = ws.write(data)
            if (!flag) {
                this.pause()
            }
        })

        ws.on('drain', ()=>{
            this.resume()
        })
    }

    //当暂停时，关掉流动模式
    pause() {
        this.flowing = false
    }

    resume() {
        this.flowing = true
        this.read()
    }
}

module.exports = ReadStream