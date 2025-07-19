Array.prototype.myReduce=function(callback,initialValue){
    if(typeof callback!=="function"){
        throw new TypeError(callback + 'is not a function')
    }
    let acc;
    let startIndex;

    if(initialValue!=="undefined"){
        acc=initialValue;
        startIndex=0
    }else{
        if(this.length===0){
            throw new TypeError("reduce of empty array with no value" )
        }

        acc=this[0];
        startIndex=1;
    }
    for(let i=startIndex;i<this.length;i++){
        acc=callback(acc,this[i],i,this)
    }
  return acc;
}



let arr=[1,2,3,4,5];
let ans=arr.myReduce((acc,val)=>acc+val,0);

console.log(ans)