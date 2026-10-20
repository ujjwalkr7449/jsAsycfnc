//A callback is a function passed to another function so it can be called later or at a particular point.
function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

function sayWelcome() {
  console.log("Welcome to JavaScript!");
}

greet("Ujjwal", sayWelcome);