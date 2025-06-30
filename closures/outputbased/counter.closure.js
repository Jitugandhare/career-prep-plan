function counter() {
    let count = 0;

    return {
        increment: function () {
            count++;
            return count;
        },

        decrement: function () {
            count--;
            return count;
        },
        reset: function () {
            count = 0;
            return count;
        }
    }
}


let c=counter();
console.log(c.increment())
console.log(c.increment())
console.log(c.increment())
console.log(c.increment())
console.log(`decrement`)
console.log(c.decrement())
console.log(c.decrement())
console.log(`reset`,c.reset())