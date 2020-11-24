process.on('message', (message, sendHandle) => {
    console.log(message)
    process.send('test3:' + message)
})