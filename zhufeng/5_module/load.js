console.log('a');
console.log(module.loaded);
console.log('b');
setTimeout(()=>{
    console.log(module.loaded);
},1000)