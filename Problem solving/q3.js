function longestWord(str){
    let wordLen=str.split(" ")
    let word='';
    let max=-Infinity;
    for(let i=0;i<wordLen.length;i++){
        if(max<wordLen[i].length){
            max=wordLen[i].length;
            word=wordLen[i]
        }


    }
    return `${word}  ${max} `
}


let str="The quick brown fox jumps";
console.log(longestWord(str))