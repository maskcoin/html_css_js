let crypto = require('crypto')
let fs = require('fs')
let key = fs.readFileSync('./rsa_private.key')


let hmac = crypto.createHmac('sha1', key)

hmac.update('123')
let result = hmac.digest('hex')
console.log(result.toString());
