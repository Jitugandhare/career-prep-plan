function isAnagram(str1, str2) {
    if (str1.length !== str2.length) {
        return false;

    }
    let obj1 = {}
    let obj2 = {};

    for (let i = 0; i < str1.length; i++) {
        if (str1[i] != " ") {
            obj1[str1[i]] = (obj1[str1[i]] || 0) + 1;

        }
    }

    for(let i=0;i<str2.length;i++){
        if(str2[i]!==" "){
            obj2[str2[i]]=(obj2[str2[i]] || 0) + 1;
        }
    }

    let a=Object.keys(obj1)
    let b=Object.keys(obj2)
    a=a.sort().join("")
    b=b.sort().join("")
   

    return a===b;


}


let str1 = 'silent', str2 = 'listen'
console.log(isAnagram(str1, str2))


// function anagram(str1,str2){
//     if(str1.length!==str2.length){
//         return false;
//     }
//     let s1=str1.replace(/\s/g," ").split("").sort().join("");
//     let s2=str2.replace(/\s/g," ").split("").sort().join("")

//     return s1===s2

// }

// let str1='silent', str2='listen'
// console.log(anagram(str1,str2))