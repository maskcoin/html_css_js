function myModule() {
    //私有数据
    var msg = 'My atguigu'

    //操作数据的函数
    function doSomething() { // 闭包msg
        console.log('doSomething()' + msg.toUpperCase())
    }

    function doOtherThing() {
        console.log('doOtherThing()' + msg.toLowerCase())
    }


    //向外暴露的对象
    return {
        doSomething: doSomething,
        doOtherThing: doOtherThing
    }
}