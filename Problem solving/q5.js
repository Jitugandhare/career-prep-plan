function commonElementsOfArray(a,b){
  
    let res=[];
    for(let i=0;i<a.length;i++){
        if(b.includes(a[i])){
            res.push(a[i])
        }
    }
   console.log(res)
}



let a= [1, 2, 3, 4] ;
let b= [3, 4, 5, 6];


commonElementsOfArray(a,b)