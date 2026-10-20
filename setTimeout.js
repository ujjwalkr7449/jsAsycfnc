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