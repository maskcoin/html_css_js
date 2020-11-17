let fs = require('fs')
let EventEmitter = require('events')

class WriteStream extends EventEmitter {
    constructor(path, options) {
        super(path, options);
        this.path = path
        this.flags = options.flags || 'w'
        this.mode = options.mode || 0o666
        this.start = options.start || 0
        this.pos = this.start//文件写入的索引
        this.encoding = options.encoding || 'utf8'
        this.autoClose = options.autoClose || true
        this.highWaterMark = options.highWaterMark || 16 * 1024
        this.buffers = [] //缓存区

        this.writing = false //表示内部正在写入数据
        this.length = 0//表示缓存区字节的长度
        this.open()
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                if (this.autoClose) {
                    this.destory()
                }
                this.emit('error', err)
            } else {
                this.fd = fd
                this.emit('open')
            }
        })
    }

    //如果底层已经在写入数据，则必须将当前要写入的数据放在缓存区中
    write(chunk, encoding, cb) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, this.encoding)

        //缓存区的长度加上当前写入的长度
        this.length += chunk.length

        if (this.writing) {//表示正在向底层写数据，则当前数据必须放在缓存区里
            this.buffers.push({
                chunk,
                encoding,
                cb
            })
        } else { //直接调用底层的写入方法进行写入
            //在底层写完当前数据后要清空缓存区
            this.writing = true
            this._write(chunk, encoding, () => this.clearBuffer())
        }

        //判断当前最新的缓存区是否小于最高水位线
        return this.length < this.highWaterMark
    }

    _write(chunk, encoding, cb) {
        if (typeof this.fd !== 'number') {
            this.once('open', () => this._write(chunk, encoding, cb))
            return
        }

        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, written, buffer) => {
            if (err) {
                if (this.autoClose) {
                    this.destroy()
                    this.emit('error', err)
                }
            }
            this.pos += written
            this.length -= written
            cb && cb()
        })
    }

    clearBuffer() {
        //取出缓存区中的第一个buffer
        let data = this.buffers.shift()
        if (data) {
            this._write(data.chunk, data.encoding, () => this.clearBuffer())
        } else {
            this.writing = false
            //缓存区清空了
            this.emit('drain')
        }
    }

    destroy() {
        fs.close(this.fd, err => {
            this.emit('close')
        })
    }
}

module.exports = WriteStream