function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

function sayWelcome() {
  console.log("Welcome to JavaScript!");
}

greet("Ujjwal", sayWelcome); 