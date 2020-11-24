//parser方法解析请求对象，其实就是socket.on(data)拿到的那个data，解析出请求头，再传给请求监听函数
let fs = require('fs')
let {StringDecoder} = require('string_decoder')
//把buffer转成字符串，可以保证不乱码
let decoder = new StringDecoder()

function parser(requestStream, requestListener) {
    requestStream.on('readable', () => {
        let buf
        let buffers = []
        while (null != (buf = requestStream.read())) {
            buffers.push(buf)
            let str = decoder.write(buf)
            if (str.match(/\n\n/)) {
                let result = Buffer.concat(buffers).toString()
                let values = result.split(/\n\n/)
                let headers = values.shift()
                let headObj = parseHeader(headers)
                Object.assign(requestStream, headObj)
                let body = values.join('\n\n')
                requestStream.unshift(Buffer.from(body))
                requestListener(requestStream)
                return
            }
        }
    })
}

function parseHeader(headerStr) {
    let lines = headerStr.split(/\n/)
    let startLine = lines.shift()
    let starts = startLine.split(' ')
    let method = starts[0]
    let url = starts[1]
    let protocol = starts[2]
    // let protocolName = protocol.split('/')[0]
    // let protocolVersion = protocol.split('/')[1]

    let headers = {}
    lines.forEach(line => {
        let row = line.split(': ')
        headers[row[0]] = row[1]
    })

    return {headers, method, url, protocol}
}

let rs = fs.createReadStream('./req.txt')

//socket拆成两个对象，一个请求一个响应
parser(rs, (req, res) => {
    console.log(req.method); //POST
    console.log(req.url);
    console.log(req.headers);
    //应该拿到完整的请求体
    req.on('data', (data) => {
        console.log(data.toString())
    })

    req.on('end', () => {
        console.log('请求处理结束，开始响应 res.end()')
    })
})
