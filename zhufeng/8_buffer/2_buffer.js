let buf3 = Buffer.from('珠')
let buf4 = Buffer.from('峰')
Buffer.concat2 = function (list, total = list.reduce((len, item) => len + item.length, 0)) {
    if (list.length === 1) {
        return list[0]
    }
    let result = Buffer.alloc(total)

    let index = 0
    for (let buf of list) {
        for (let b of buf) {
            if (index >= total) {
                return result
            } else {
                result[index++] = b
            }
        }
    }

    return result
}

let result = Buffer.concat2([buf3, buf4])

console.log(result.toString());
