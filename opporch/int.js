

function revSentense(str) {
    let res = str.split(" ")
    let ans = res.map((i) => i.split("").reverse().join(""))

    console.log(ans.join(" "))
}


const message = 'Hello My name is jitu'
revSentense(message)


function flatteningArray(arr) {
    let ans = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            ans = ans.concat(flatteningArray(arr[i]));
        } else {
            ans.push(arr[i])
        }
    } return ans;
}


let arr = [1, 2, [1, 2], [2, 3], [4, 5]]
console.log(flatteningArray(arr))