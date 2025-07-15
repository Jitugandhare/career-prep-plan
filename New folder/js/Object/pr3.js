
const students = [
    { id: 1, name: "jitu", score: 500 },
    { id: 2, name: "jay", score: 450 },
    { id: 3, name: "ravi", score: 400 },
    { id: 4, name: "john", score: 300 },
]

// average score of all

function avg(array) {

    let sum = students.reduce((acc, val) => acc + val.score, 0)
    let average = sum / students.length
    return average
}

console.log(`Average score:` ,avg(students))