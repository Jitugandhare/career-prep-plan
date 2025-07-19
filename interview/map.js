 Array.prototype.myMap=function(callback) {
    let res = []
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            res.push(callback(this[i], i, this))
        }
    }
    return res;

}

const arr = [1, 2, 3];
const doubled = arr.myMap(x => x * 2); 
console.log(doubled)
