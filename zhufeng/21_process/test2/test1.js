process.on('SIGTERM', function () {
    // console.log('SIGTERM')
    process.stdout.write('SIGTERM')
})

// let i = 0
// let timer = setInterval(()=>{
//     if ((i++) < 10) {
//         process.stdout.write(1)
//     } else {
//         clearInterval(timer)
//     }
// }, 1000)

// for (let i=2; i<process.argv.length; i++) {
//     // process.stdout.write(i+'\n')
//     console.log(process.argv[i])
// }

