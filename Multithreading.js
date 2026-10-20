//Multithreading means multiple threads can perform work concurrently. Some JavaScript environments support this through mechanisms such as Web Workers in browsers or worker threads in Node.js.


const worker = new Worker("worker.js");

worker.postMessage(5);

worker.onmessage = (event) => {
  console.log("Result:", event.data);
};