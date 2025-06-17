function anagramString(str1, str2) {
    str1 = str1.replace('/\s/g', "")
    str2 = str2.replace('/\s/g', "")

    let s1 = str1.split("").sort().join("");
    let s2 = str2.split("").sort().join("");

    if (str1.length !== str2.length) {
        return false;
    }

    return s1 === s2;
}


let str1 = "listen";
let str2 = "silent";

console.log(anagramString(str1, str2))