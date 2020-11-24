let {execFile} = require('child_process')
let path = require('path')

let p1 = execFile('node', ['test2.js','a', 'b', 'c'], {
    cwd: path.join(__dirname, 'test2')
}, (err, stdout, stderr) => {
    console.log(stdout)
})