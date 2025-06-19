// const promiseNew = new Promise((resolve, reject) => {
//   console.log('One');
// });
// promiseNew .then(() => {
//   console.log('Three');
// });
// console.log('Two');

// console.log(typeof undefined === typeof NULL)

// Consider the code below:
// <a id="click">click meeee!</a>
// <script>
// var a = document.getElementById('click');
// a.onclick = function() {
// console.log(this.innerHTML) //#1
// setTimeout(function() {
// console.log(this.innerHTML); // #2
// }, 1000);
// };
// </script>.What would #1 and #2 result in, and why?
// in brief


function customobject() {
    this.value = 2;
}
customobject.prototype.inc = function () {
    this.value++;
}

function changer(func) {
    func();
}

var o = new customobject();
alert(o.value); // o.value = 2

o.inc();
alert(o.value); // o.value = 3

changer(o.inc);
alert(o.value); 