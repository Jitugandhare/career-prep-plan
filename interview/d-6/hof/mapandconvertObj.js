function hof(arr) {
    let ans = arr.map((i) => {
        return {
            value: i,
            isEven: i % 2 === 0
        }
    })

    console.log(ans)
}

let arr = [3, 6, 9, 12, 15, 18];


hof(arr)