// Group students by pass or fail (pass if score >= 60, fail if < 60), 
// returning an object like { pass: [...], fail: [...] }.

const students = [
    { id: 1, name: "Jitu", age: 27, score: 80 },
    { id: 2, name: "Jay", age: 25, score: 60 },
    { id: 3, name: "Ravi", age: 22, score: 45 },
    { id: 4, name: "John", age: 29, score: 55 },
    { id: 5, name: "Jetha", age: 35, score: 60 },
    { id: 6, name: "Bablu", age: 30, score: 65 },
    { id: 7, name: "Martin", age: 26, score: 75 },
    { id: 8, name: "Alice", age: 25, score: 85 },
    { id: 9, name: "Bob", age: 30, score: 95 },
    { id: 10, name: "Charlie", age: 25, score: 90 },
    { id: 11, name: "David", age: 30, score: 77 },
    { id: 12, name: "Eve", age: 35, score: 33 }
];

let ans=students.reduce((acc,val)=>{
    if(val.score>=60){
        acc.pass.push(val)
    }else{
        acc.fail.push(val)
    }
    
    
   if (!acc[val.age]) {
        acc[val.age] = [];
    }
    acc[val.age].push(val.name);

    return acc;
}
,{pass:[],fail:[]})


console.log(ans)
