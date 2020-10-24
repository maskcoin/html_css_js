(function (window) {
    var msg = 'My atguigu'

    //操作数据的函数
    function doSomething() { // 闭包msg
        console.log('doSomething()' + msg.toUpperCase())
    }

    function doOtherThing() {
        console.log('doOtherThing()' + msg.toLowerCase())
    }

    //向外暴露的对象(给外部使用的方法)
    window.myModule2 = {
        doSomething: doSomething,
        doOtherThing: doOtherThing
    }
})(window)