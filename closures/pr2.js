/* 
Why Is Closure Useful?

Closures are powerful! You can use them to:

Remember data without using global variables.

Create private variables (secret info).

Write code that is more safe and organized.


*/

function createCouter(){
    let count=0; // its our private variable

 function inner(){
        count++;
        console.log(count);

    }
   return inner
}

let counter=createCouter();
counter();
counter();
counter();
counter();