const counter = () => {
    let count = 0;

    function add() {
        count++
        console.log(count)
    }
    function subs() {

        count--
        console.log(count)
    }
    function reset() {
        count = 0
        console.log(count)
    }
    return {
        add, subs, reset
    }

}


const c = counter();
c.add();
c.add()
c.reset()