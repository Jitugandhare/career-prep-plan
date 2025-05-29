function outer(){
    let outerVar="I am outer variable...";
    
    function inner(){
        console.log(outerVar)
    }
    inner();
}

let ans=outer
ans()