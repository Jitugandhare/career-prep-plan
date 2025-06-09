function flattenArray(arr) {
    return arr.reduce((acc, val) => acc.concat(val), [])
}
let arr = [1, [2, 3], 4, [5, 6]];
console.log(flattenArray(arr))