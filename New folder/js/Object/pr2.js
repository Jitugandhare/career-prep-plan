// Create an array of objects where each object represents a student with id, name, and score.

const students = [
    { id: 1, name: "jitu", score: 500 },
    { id: 2, name: "jay", score: 450 },
    { id: 3, name: "ravi", score: 400 },
    { id: 4, name: "john", score: 300 },
]

//Write a function to find a student by their id from the array.


//using map
function findByIde(id){
    return students.map((i)=>{
       
            if(i.id===id){
                return i
            }else{
                return null
            }
        
    });
    
}

console.log(findByIde(1))

// find method
function findById(id){
    return students.find((i)=>i.id===id)
    
}

console.log(findById(2))