//fetch(), Axios and XMLHttpRequest
//All three can be used to make HTTP requests, but they work differently.
//A. Fetch API
//Built into modern browsers and modern Node.js versions.
async function getPosts() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const posts = await response.json();

    console.log(posts);
  } catch (error) {
    console.error(error.message);
  }
}

getPosts();

// Axios: Axios is a separate HTTP client library. Install it in your project:npm install axios
import axios from "axios";

async function getPosts() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

getPosts();


//C. XMLHttpRequest : This is an older browser API that supports asynchronous HTTP requests.
const xhr = new XMLHttpRequest();

xhr.open(
  "GET",
  "https://jsonplaceholder.typicode.com/posts/1",
  true
);

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.log("Request failed:", xhr.status);
  }
};

xhr.onerror = function () {
  console.log("Network error");
};

xhr.send();