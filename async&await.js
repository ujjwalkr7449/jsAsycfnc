/*This is one of the most important topics for your React and FastAPI projects.

async declares an asynchronous function. Calling an async function always returns a Promise. */
async function getMessage() {
  return "Hello Ujjwal";
}

getMessage().then((message) => {
  console.log(message);
});
//Example with await
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data loaded successfully");
    }, 2000);
  });
}

async function showData() {
  console.log("Loading...");

  const result = await getData();

  console.log(result);
}

showData();
console.log("Other work");