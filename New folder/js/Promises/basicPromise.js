const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { id: 1, name: "jitu",age:27 }
        resolve(data)
    }, 1000)
})

fetchData.then((data) => {
    console.log(data)

    console.log("name:",data.name)
    console.log("age:",data.age)
}).catch((error) => {
    console.log(error)
})