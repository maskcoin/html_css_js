let i = 0
let timer = setInterval(() => {
    process.stdout.write(new Date().toUTCString() + '\n')
    if (i++ >= 10) {
        clearInterval(timer)
    }
}, 100)