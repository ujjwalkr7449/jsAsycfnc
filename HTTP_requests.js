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