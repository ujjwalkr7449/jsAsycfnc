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