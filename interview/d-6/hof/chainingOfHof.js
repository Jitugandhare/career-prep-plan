function hof(arr) {
    let ans = arr.filter(i => i % 2 !== 0).map(i => i * 2).
        reduce((acc, val) => acc + val, 0)

    console.log(ans)
}

let arr = [3, 6, 9, 12, 15, 18];


hof(arr)