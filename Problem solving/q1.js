function anagram(str1,str2){
    if(str1.length!==str2.length){
        return false;
    }
    let s1=str1.replace(/\s/g," ").split("").sort().join("");
    let s2=str2.replace(/\s/g," ").split("").sort().join("")

    return s1===s2

}

let str1='silent', str2='listen'
console.log(anagram(str1,str2))