const promise=new Promise((resolve,reject)=>{
    let success=true;
    if(success){
        resolve("Operation was successful")
    }else{
        reject("Operation failed")
    }
})


promise.then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})