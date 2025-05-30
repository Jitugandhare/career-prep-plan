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


let object = {
    name: "jitu",
    surname: "gandhare",
    get length() {
        return Object.keys(this).length;
    }
};

console.log(object.length); 

