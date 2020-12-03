const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
const uuid = require('uuid')
const app = new Koa()
app.listen(3000)

Buffer.prototype.split = function(sep) {
    let pos = 0 //记录当前是从哪个索引开始查找分隔符
    let len = sep.length //分隔符的字节长度
    let index = -1 //查找到的分隔子串所在的索引
    let parts = []
    while(-1 != (index = this.indexOf(sep, pos))) {
        parts.push(this.slice(pos, index))
        pos = index + len
    }
    parts.push(this.slice(pos))
    return parts
}

app.use(async function (ctx, next) {
    if (ctx.url === '/user' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8')
        ctx.body = (`
            <form method="post" enctype="multipart/form-data">
                <input type="text" name="username">
                <input type="file" name="avatar">
                <input type="submit">
            </form>
        `)
    } else {
        await next()
    }
})

//如果要上传文件的话，express要用multer中间件  koa里面要用koa-better-body
/*
* "avatar": [
{
"size": 13650,
"path": "/Users/xuchanghui/html_css_js/zhufeng/28_koa/uploads/upload_8a045a6a52c19fef9617b1fe5c2254db",
"name": "密码.rtf",
"type": "text/rtf",
"mtime": "2020-12-02T09:58:41.763Z"
}
]
*   请求头中的内容类型
*  Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryHAD5vT1zRGVa6dTr
*
*
* */
app.use(async function (ctx, next) {
    if (ctx.url === '/user' && ctx.method === 'POST') {
        let contentType = ctx.headers['content-type']
        if (contentType.includes('multipart/form-data')) {
            let matches = contentType.match(/\bboundary=(.+)/)
            let sep = '--' + matches[1]
            ctx.body = sep
            ctx.body = await getBody(ctx.req, sep)
        } else {
            next()
        }
    }
})

//返回了真正的 请求体
function getBody(req, sep) {
    return new Promise((resolve, reject) => {
        let buffers = []
        req.on('data', function (data) {
            buffers.push(data)
        })
        req.on('end', function () {
            let all = Buffer.concat(buffers)
            let fields = {}
            let lines = all.split(sep)
            lines = lines.slice(1, -1) //2
            lines.forEach(line => {
                let [desc, val] = line.split('\r\n\r\n')
                desc = desc.toString()
                val = val.slice(0, -2) //去掉尾部的\r\n
                if (desc.includes('filename')) { //如果包含filename就认为它是一个文件
                    let [,line1, line2] = desc.split('\r\n')
                    let lineObj1 = querystring.parse(line1, '; ')
                    let lineObj2 = querystring.parse(line2, '; ')
                    let filepath = path.join(__dirname, 'uploads', uuid.v4())
                    fs.writeFileSync(filepath, val)

                    fields[lineObj1.name.replace(/"/g, '')] = [
                        {
                            ...lineObj1,
                            ...lineObj2,
                            filepath
                        }
                    ]
                } else { //普通的字段
                    let name = querystring.parse(desc, '; ').name.replace(/"/g, '')
                    fields[name] = val.toString()
                }
            })
            resolve(fields)
        })
    })
}



