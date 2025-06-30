function outer(){
    let x=42;
    return ()=>console.log(x++)
}

const f1=outer();
const f2=outer();


f1();//42
f2();//42
f1();//43