const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data fetched successfully!");
    }, 2000);
});

myPromise
    .then(result => {
        console.log(result); // "Data fetched successfully!"
    })
    .catch(error => {
        console.error(error);
    });
