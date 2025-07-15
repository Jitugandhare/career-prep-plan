
const students = [
    { id: 1, name: "jitu", score: 500 },
    { id: 2, name: "jay", score: 400 },
    { id: 3, name: "ravi", score: 450 },
    { id: 4, name: "john", score: 350 },
]

// average score of all

function avg(array) {

    let sum = students.reduce((acc, val) => acc + val.score, 0)
    let average = sum / students.length
    return average
}

console.log(`Average score:` ,avg(students))


// Sort the array of students by their score in descending order.

function sortStudents(arr){
    let ans= [...arr].sort((a,b)=>b.score-a.score)
    return ans;
}

console.log(`Sort the array of students by their score in descending order:` ,sortStudents(students))