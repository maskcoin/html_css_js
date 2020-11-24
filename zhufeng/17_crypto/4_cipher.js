//对称加密
let crypto = require('crypto')
let fs = require('fs')
let str = 'abcde'
let pk = fs.readFileSync('./rsa_private.key')
let cipher = crypto.createCipher('blowfish', pk)
cipher.update(str, "utf8")
let result  = cipher.final('hex')
console.log(result)

let decipher = crypto.createDecipher('blowfish', pk)
decipher.update(result, 'hex')
let r = decipher.final('utf8')
console.log(r)