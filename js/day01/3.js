// console.log(Boolean(0)) //false
// console.log(Boolean('')) //false
// console.log(Boolean(' ')) //true
// console.log(Boolean(null)) //false
// console.log(Boolean(undefined)) //false
// console.log(Boolean([])) //true
// console.log(Boolean([12])) //true

//!：取反（先转为布尔，然后取反）
//!!：取反再取反，只相当于转换为布尔<=>Boolean([val])
// console.log(!1)

if ('3px' - 3) {
    console.log('嘿嘿')
} else {
    console.log('3px' - 3)
}