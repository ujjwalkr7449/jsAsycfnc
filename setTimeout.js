console.log("Start");

setTimeout(() => {
  console.log("Task completed");
}, 2000);

console.log("End");

//Example: compare the two
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

//Event loop example
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");