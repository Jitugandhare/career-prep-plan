function greeting() {
  let name = "Jitu";

  return function () {
    console.log("Hi " + name);
  };
}

const sayHi = greeting(); // Step 1
sayHi(); // Step 2
