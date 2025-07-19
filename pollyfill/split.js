String.prototype.mySplit = function ( delimiter) {
    let res = []
    let curr = ""
    for (let i = 0; i < this.length; i++) {
        if (this[i] === delimiter) {
            res.push(curr)
            curr = ""

        } else {
            curr += this[i]
        }
    }
    res.push(curr)
    return res
}


console.log("apple,banana,orange".mySplit(",")); 


console.log("hello world".mySplit(" "));


