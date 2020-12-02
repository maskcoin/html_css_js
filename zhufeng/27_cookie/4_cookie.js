const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.listen(8080)

app.use(cookieParser())

/*
Set-Cookie: name=zfpx; Domain=maskcoin.com; Path=/
* domain 就是指定此cookie是属于哪个域名的
* */
app.get('/write', function (req,  res) {
    res.cookie = function(key, val, options) {
        let {domain, path, maxAge, expires, httpOnly, secure} = options
        let parts = [`${key}=${val}`]
        if (domain) {
            parts.push(`Domain=${domain}`)
        }
        if (path) {
            parts.push(`Path=${path}`)
        }
        if (maxAge) {
            parts.push(`Max-Age=${maxAge}`)
        }
        if (expires) {
            parts.push(`Expires=${expires}`)
        }
        if (httpOnly) {
            parts.push(`Http-Only`)
        }
        if (secure) {
            parts.push(`Secure`)
        }
        let cookie = parts.join('; ')
        res.setHeader('Set-Cookie', cookie)
    }
    res.cookie('name', 'zfpx', {
        httpOnly: true,
        secure: true,
        expire: new Date(Date.now()+10*1000),
        maxAge: 10*1000,
        path: '/read2',
        domain: 'localhost'
    })
    res.end('write ok')
})
app.get('/read', function (req,  res) {
    res.send(req.cookies)
})

app.get('/read1', function (req,  res) {
    res.send(req.cookies)
})

app.get('/read2', function (req,  res) {
    res.send(req.cookies)
})

app.get('/read1/1', function (req,  res) {
    res.send(req.cookies)
})

