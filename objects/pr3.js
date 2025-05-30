/*
The comma operator evaluates each of its operands (from left to right) and 
returns the value of the last operand.

*/

function magic(){
    return 1,[],{},8
}


console.log(magic())