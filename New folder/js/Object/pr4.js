// Group students by pass or fail (pass if score >= 60, fail if < 60), 
// returning an object like { pass: [...], fail: [...] }.

const students = [
    { id: 1, name: "jitu", score: 80 },
    { id: 2, name: "jay", score: 60 },
    { id: 3, name: "ravi", score: 45 },
    { id: 4, name: "john", score: 55 },
    { id: 5, name: "jetha", score: 60 },
    { id: 6, name: "bob", score: 65 },
    { id: 7, name: "martin", score: 75 },
];

let ans = students.reduce((acc, val) => {
    if (val.score > 60) {
        acc.pass.push(val)
    } else {
        acc.fail.push(val)
    }
    return acc;
}
    , { pass: [], fail: [] })


console.log(ans)
