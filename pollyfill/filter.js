Array.prototype.myFilter=function(callback){
    let res=[];
    for(let i=0;i<this.length;i++){
        if(this.hasOwnProperty(i) && callback(this[i],i,this)){
            res.push(this[i])
        }
    }return res;

}


let arr=[1,2,3,4,5];
let ans=arr.myFilter((i)=>i%2===0);

console.log(ans)