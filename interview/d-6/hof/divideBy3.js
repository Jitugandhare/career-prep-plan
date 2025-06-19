function hof(arr) {
    let ans = arr.filter((num) => num % 3 === 0 && num % 6 !== 0)

    console.log(ans)
}

let arr = [3, 6, 9, 12, 15, 18];


hof(arr)