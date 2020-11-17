let fs = require('fs')
let path = require('path')
fs.readdir('./a', (err, files) => {
    console.log(files);
    for (let file of files) {
        let child = path.join('a', file)
        console.log(child);
        fs.stat(child, (err1, stats) => {
            console.log(stats);
        })
    }
})