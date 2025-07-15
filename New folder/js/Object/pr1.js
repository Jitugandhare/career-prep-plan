// Create an object representing a person with the properties:
//  name, age, and city. Then access the name and city properties.
// Add a new property profession to the existing object.

const person={
    name:"jitu ",
    age:27,
    city:"Indore"
}

person.profession="software developer"

console.log("name:",person.name)
console.log("age:" ,person.age)

delete person.age

console.log(person)