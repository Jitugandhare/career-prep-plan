Array.prototype.myFilter=function(callback){
 let res=[];
 for(let i=0;i<this.length;i++){
    if(this.hasOwnProperty(i) && callback(this[i],i,this)){
        res.push(this[i])
    }
 }return res;
};

const arr = [1, 2, 3, 4];
const even = arr.myFilter(x => x % 2 === 0); 