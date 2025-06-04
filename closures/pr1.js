/* 
In javascript when a function preserve some values it creates a closure.

There are three main things in a closure:

A function inside another function.

The inner function uses variables from the outer function.

Even after the outer function is finished, the inner function remembers those variables.


*/



function outer(){
    let outerVar="I am outer variable...";
    
    function inner(){
        console.log(outerVar)
    }
    inner();
}

let ans=outer
ans()