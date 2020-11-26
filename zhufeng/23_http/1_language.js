let http = require('http')
http.createServer(request).listen(8080)

const lanPack = {
    zh: {
        title: '欢迎光临'
    },
    en: {
        title: 'welcome'
    },
    default: 'en'
}

function request(req, res) {
    //实现服务器和客户端的协商，选择客户端最想要的，并且服务器正好有的
    //Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
    let acceptLanguage = req.headers['accept-language']
    if (acceptLanguage) {
        let lans = acceptLanguage.split(',').map(item => {
            let values = item.split(';')
            let lan = values[0]
            let q = values[1] ? parseFloat(values[1].split('=')[1]) : 1
            return {lan, q}
        }).sort((a, b) => b.q - a.q)
        let language = lanPack.default //默认的语言
        for (let i = 0; i < lans.length; i++) {
            //如果此语言在语言包里有，那么就使用此语言
            if (lanPack[lans[i].lan]) {
                language = lans[i].lan
                break
            }
        }
        res.end(JSON.stringify(lanPack[language]))
    }
}