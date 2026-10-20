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
//Error handling with async/await
async function getUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await response.json();

    console.log(user);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

getUser();