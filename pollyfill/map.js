Array.prototype.myMap=function(callback){
    let res=[];
    for(let i=0;i<this.length;i++){
        if(this.hasOwnProperty(i)){
            res.push(callback(this[i],i,this))
        }
    }return res;
}


let arr=[1,2,3,4,5];
let ans=arr.myMap((i)=>i*2);

console.log(ans)