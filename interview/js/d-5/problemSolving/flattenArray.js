function flattenArray(arr) {
    let res=[]
    for(let i of arr){
        if(Array.isArray(i)){
            res.push(...i)
        }else{
            res.push(i)
        }
    }
    return res;
}
let arr = [1, [2, 3], 4, [5, 6]];
console.log(flattenArray(arr))