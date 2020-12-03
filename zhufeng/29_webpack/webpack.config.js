let path = require('path')
//webpack内部有一个事件流，tapable 1.0
module.exports = {
    entry: './src/index.js', //入口
    output: {
        path: path.join(__dirname, 'dist'), //输出的文件夹，只能是绝对路径
        filename: 'boudle.js' //打包后的文件名
    },
    module: {

    },
    plugins: [

    ]
}