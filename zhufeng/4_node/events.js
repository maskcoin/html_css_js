function EventEmitter() {
    this.events = {} // 会把所有的事件监听函数放在这个对象里保存
    //指定给一个事件类型增加的监听函数数量最多有多少个
    this._maxListeners = 10
}

//给指定的事件绑定事件处理函数，1参数是事件类型，2参数是事件监听函数
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (type, listener) {
    if (this.events[type]) {
        this.events[type].push(listener)
        if (this._maxListeners != 0 && this.events[type].length >= this._maxListeners) {
            console.error('maxlistens')
        }
    } else {
        this.events[type] = [listener]
    }
}

EventEmitter.prototype.once = function (type, listener) {
    //用完即焚
    let wrapper = (...rest) => {
        listener(...rest)//先让原始的监听函数执行
        this.removeListener(type, wrapper)
    }

    this.on(type, wrapper)
}

EventEmitter.prototype.removeListener = function (type, listener) {
    if (this.events[type]) {
        this.events[type] = this.events[type].filter(l => l != listener)
    }
}

EventEmitter.prototype.emit = function (type, ...args) {
    if (this.events[type]) {
        this.events[type].forEach(listener => {
            listener(...args)
        })
    }
}

EventEmitter.prototype.removeAllListeners = function (type) {
    if (this.events[type]) {
        delete this.events[type]
    }
}

EventEmitter.prototype.setMaxListeners = function (n) {
    this._maxListeners = n
}

EventEmitter.prototype.listeners = function(type) {
    if (this.events[type]) {
        return this.events[type]
    } else {
        return []
    }
}

module.exports = EventEmitter