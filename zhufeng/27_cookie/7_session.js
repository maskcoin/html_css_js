const express = require('express')
const session = require('express-session')
const app = express()
app.listen(8080)
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'hanxing614'
}))