// fork exec execFile 它们其实都是基于spawn的改进方法
let {fork} = require('child_process')

// function fork(modulePath, args, options) {
//     let {silent} = options
//     let opts = Object.assign({}, options)
//     if (silent) {
//         opts.stdio = ['ignore', 'ignore', 'ignore']
//     } else {
//         opts.stdio = [process.stdin, process.stdout, process.stderr]
//     }
//     return spawn('node', [modulePath, ...args], opts)
// }

let child = fork('fork.js', ['zfpx'], {
    cwd: __dirname,
    silent: true
})

child.on('message', message => {
    console.log(message)
})

child.send('name')
