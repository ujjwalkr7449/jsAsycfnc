/*This is one of the most important topics for your React and FastAPI projects.

async declares an asynchronous function. Calling an async function always returns a Promise. */
async function getMessage() {
  return "Hello Ujjwal";
}

getMessage().then((message) => {
  console.log(message);
});