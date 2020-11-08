var tabBox = document.getElementById('tabBox')
var tabList = tabBox.getElementsByTagName('div')
var navBox = document.getElementById('navBox')
var navList = navBox.getElementsByTagName('li')

//循环3个LI，给每一个LI都绑定点击事件
for (let i = 0; i < navList.length; i++) {
    navList[i].onclick = function () {
        changeTab(i)
    }
}

//封装一个函数实现选项卡的切换
function changeTab(clickIndex) {
    //1.先让所有的LI和DIV都没有选中的样式
    for(var i=0; i<navList.length; i++) {
        navList[i].className = ''
        tabList[i].className = ''
    }
    //2.点击的是谁就给谁加
    navList[clickIndex].className = 'active'
    tabList[clickIndex].className = 'active'
}

