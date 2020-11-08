let ary = [1, 2]
for (let item of ary) {
    console.log(item)
}

//深度克隆
let obj = {
    age: 5,
    getAge() {
        console.log(this.age)
    },
    hobby: [1, 2, 3],
    home: {name:'北京'}
}

let obj2 = deepClone(obj)
obj2.age = 10
obj2.hobby.push(4)
obj2.home.city = '上海'
console.log(obj2)
console.log(obj)

function deepClone(parent, child) {
    child = child? child: {}
    for(let key in parent) {
        if (parent.hasOwnProperty(key)) {
            if (typeof parent[key] === 'object') {
                child[key] = Object.prototype.toString.call(parent[key]) === '[object Object]'? {} :[]
                deepClone(parent[key], child[key])
            } else {
                child[key] = parent[key]
            }
        }
    }
    return child
}