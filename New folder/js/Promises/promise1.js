// promise in js is an object that represents eventual completion (or failure) of asynchronous operation and 
// resulting its value. Promises provides more cleaner and manageable way to work with asynchronous operations.

// it has 3 states: 1.pending, 2.fulfilled,3.rejected.


const promise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve("Operation was successful")
    } else {
        reject("Operation failed")
    }
})


promise.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})