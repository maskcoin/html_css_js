/*
* 自定义Promise函数模块：
* */
(function () {
    class Promise {
        constructor(executor) {
            this.status = 'pending' // 给promise对象指定status属性，初始值为pending
            this.data = undefined // 给 promise对象指定一个用于存储结果数据的属性
            this.callbacks = [] // 每个元素的结构：{onResolved(){}, onRejected(){}}

            let _this = this

            function resolve(value) {
                // 如果当前状态不是pending，直接结束
                if (_this.status !== 'pending') {
                    return
                }

                //将状态改为'fulfilled'
                _this.status = 'fulfilled'
                //保存value的数据
                _this.data = value
                //如果有待执行的callback函数，把callback函数扔到主线程的回调队列中
                if (_this.callbacks.length > 0) {
                    setTimeout(() => { // 放入队列中执行所有成功的回调
                        _this.callbacks.forEach(
                            callbacksObj => {
                                callbacksObj.onResolved(_this.data)
                            }
                        )
                    })
                }
            }

            function reject(reason) {
                // 如果当前状态不是pending，直接结束
                if (_this.status !== 'pending') {
                    return
                }

                //将状态改为'rejected'
                _this.status = 'rejected'
                //保存value的数据
                _this.data = reason
                //如果有待执行的callback函数，把callback函数扔到主线程的回调队列中
                if (_this.callbacks.length > 0) {
                    setTimeout(() => { // 放入队列中执行所有成功的回调
                        _this.callbacks.forEach(
                            callbacksObj => {
                                callbacksObj.onRejected(_this.data)
                            }
                        )
                    })
                }
            }

            //立即同步执行executor
            try {
                executor(resolve, reject)
            } catch (e) { //如果执行器抛出异常，promise对象变为rejected状态
                reject(e)
            }
        }


        /*
   * Promise原型对象的then()
   * 指定成功和失败的回调函数，生成一个promise对象status发生变化时的callback回调函数
   * 返回一个新的promise对象
   * */
        then(onResolved, onRejected) {
            onResolved = typeof onResolved === 'function' ? onResolved : value => value
            //实现异常穿透
            onRejected = typeof onRejected === 'function' ? onRejected : reason => {
                throw reason
            }

            const _this = this
            // 返回一个新的promise对象
            return new Promise((resolve, reject) => {
                /*
                * 调用指定回调函数处理，根据执行结果，改变return的promise的状态
                * */
                function handle(callback) {
                    try {
                        const result = callback(_this.data)
                        if (result instanceof Promise) {
                            // 3.如果回调函数执行返回是promise，return的promise结果就是返回的promise的结果
                            result.then(resolve, reject)
                        } else {
                            //2.如果回调函数执行返回非promise，return的promise就会成功，而且value就是返回的值
                            resolve(result)
                        }
                    } catch (e) {
                        // 1.如果执行抛出异常，return的promise就会失败，reason就是error
                        reject(e)
                    }
                }

                if (_this.status === 'pending') {
                    _this.callbacks.push({
                        onResolved: () => {
                            handle(onResolved)
                        },
                        onRejected: () => {
                            handle(onRejected)
                        }
                    })
                } else if (_this.status === 'fulfilled') {
                    setTimeout(() => {
                        handle(onResolved)
                    })
                } else { // 'rejected'
                    setTimeout(() => {
                        handle(onRejected)
                    })
                }
            })
        }

        /*
        * Promise原型对象的catch()
        * 指定失败的回调函数，生成一个promise对象status发生变化时的callback回调函数
        * 返回一个新的promise对象
        * */
        catch(onRejected) {
            return this.then(undefined, onRejected)
        }

        /*
        * Promise函数对象resolve方法
        * 返回一个指定结果的成功的promise
        * */
        static resolve(value) {
            return new Promise((resolve, reject) => {
                //value是promise
                if (value instanceof Promise) { //使用value的结果作为当前promise的结果
                    value.then(resolve, reject)
                } else {
                    //value不是promise
                    resolve(value)
                }
            })
        }

        /*
        * Promise函数对象reject方法
        * 返回一个指定reason的失败的promise
        * */
        static reject(reason) {
            return new Promise((resolve, reject) => {
                reject(reason)
            })
        }

        /*
        * Promise函数对象all方法
        * 返回一个promise，只有当所有promise都成功是才成功，否则只要有一个失败的就失败
        * */
        static all(promises) {
            return new Promise((resolve, reject) => {
                let values = new Array(promises.length)
                let total = 0
                // 遍历获取每个promise的结果
                promises.forEach((p, index) => {
                    Promise.resolve(p).then(value => {
                        values[index] = value
                        total++
                        if (total === promises.length) {
                            resolve(values)
                        }
                    }, reason => {
                        reject(reason)
                    })
                    // if (p instanceof Promise) {
                    //     p.then(value => {
                    //         values[index] = value
                    //         total++
                    //         if (total === promises.length) {
                    //             resolve(values)
                    //         }
                    //     }, reason => { //只要一个失败了，return的promise就失败
                    //         reject(reason)
                    //     })
                    // } else {
                    //     values[index] = p
                    //     total++
                    //     if (total === promises.length) {
                    //         resolve(values)
                    //     }
                    // }
                })
            })
        }

        /*
        * Promise函数对象race方法
        * 返回一个promise，其结果由第一个完成的promise决定
        * */
        static race(promises) {
            return new Promise((resolve, reject) => {
                promises.forEach(p => {
                    // if (p instanceof Promise) {
                    //     p.then(value => resolve(value), reason => reject(reason))
                    // } else {
                    //     resolve(p)
                    // }
                    Promise.resolve(p).then(value => resolve(value), reason => reject(reason))
                })
            })
        }

        /*
        * 返回一个promise对象，在指定的时间后才确定结果
        * */
        static resolveDelay(value, time) {
            return new Promise((resolve, reject) => {
                //value是promise
                setTimeout(() => {
                    if (value instanceof Promise) { //使用value的结果作为当前promise的结果
                        value.then(resolve, reject)
                    } else {
                        //value不是promise
                        resolve(value)
                    }
                }, time)
            })
        }

        /*
        * 返回一个promise对象，在指定的时间后才失败
        * */
        static rejectDelay(reason, time) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(reason)
                }, time)
            })
        }
    }

    //向外暴露Promise函数
    window.Promise = Promise
})()