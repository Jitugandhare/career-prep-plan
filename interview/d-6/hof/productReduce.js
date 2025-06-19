function hof(arr) {
    let ans = arr.reduce((acc, val) => acc * val, 1)

    console.log(ans)
}

let arr = [3, 6, 9, 12, 15, 18];


hof(arr)