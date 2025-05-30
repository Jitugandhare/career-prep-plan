let a = {};
let b = {};

let obj = {};
obj[a] = "Hello";
obj[b] = "World";

console.log(obj); // obj={[object object]:'World'}


/*
Corrected Understanding:
obj[a] = "Hello" stores the value under the key "[object Object]".

obj[b] = "World" stores the value under the same key, so it overwrites "Hello".

*/
