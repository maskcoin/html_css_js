// console.log('world')
process.on('message', message => {

    // process.send('子进程:' + JSON.stringify(message))
    process.send('子进程:' + message)
})