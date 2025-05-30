let obj={
    name:"jitu",
    surname:"gandhare"
}

let o=Object.prototype;
// console.log(o.length)

Object.defineProperty(o,"length",{
    get(){
        return Object.keys(this).length
    }
})


console.log(obj.length)





// alternative way
function getLength(object) {
    return Object.keys(object).length;
}

let object = {
    name: "jitu",
    surname: "gandhare"
};

console.log(getLength(object)); // 2


