# jsAsycfnc
# JavaScript Asynchronous Programming — Complete Revision Notes

> Learn JavaScript async concepts with simple explanations, practical code examples, output predictions, and interview questions.

## 📚 Table of Contents

1. [Synchronous vs Asynchronous](#1-synchronous-vs-asynchronous)
2. [Event Loop](#2-event-loop)
3. [Single-threading vs Multithreading](#3-single-threading-vs-multithreading)
4. [Callbacks](#4-callbacks)
5. [Promises](#5-promises)
6. [then() and catch()](#6-then-and-catch)
7. [async and await](#7-async-and-await)
8. [try...catch...finally](#8-trycatchfinally)
9. [setTimeout() and setInterval()](#9-settimeout-and-setinterval)
10. [Fetch, Axios, and XMLHttpRequest](#10-fetch-axios-and-xmlhttprequest)
11. [Concurrency vs Parallelism](#11-concurrency-vs-parallelism)
12. [Throttling vs Debouncing](#12-throttling-vs-debouncing)
13. [Real-World Use Cases](#13-real-world-use-cases)
14. [Interview Questions](#14-interview-questions)
15. [Output-Based Practice](#15-output-based-practice)
16. [Quick Revision Cheat Sheet](#16-quick-revision-cheat-sheet)

---

## 1. Synchronous vs Asynchronous

### Synchronous JavaScript

Synchronous code executes one statement at a time, in order.

```javascript
console.log("Step 1");
console.log("Step 2");
console.log("Step 3");
```

**Output:**

```text
Step 1
Step 2
Step 3
```

**Remember:** Sync = sequential execution.

### Asynchronous JavaScript

Asynchronous operations allow other JavaScript code to continue while an operation is pending.

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Task completed");
}, 2000);

console.log("End");
```

**Output:**

```text
Start
End
Task completed
```

**Why?**

1. `Start` prints immediately.
2. `setTimeout()` schedules a callback.
3. `End` prints without waiting for the timer.
4. The callback executes later.

> Important: JavaScript can execute synchronous code as well as coordinate asynchronous operations. Asynchronous does not automatically mean multithreading.

---

## 2. Event Loop

The event loop helps coordinate when queued work can execute after the current synchronous JavaScript work finishes.

### Main components

- **Call Stack:** Executes JavaScript functions.
- **Runtime APIs:** Handle facilities such as timers and networking.
- **Queues:** Hold callbacks and Promise reactions waiting to execute.
- **Event Loop:** Coordinates when queued work can run.

### Example

```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
```

**Output:**

```text
1
4
3
2
```

**Explanation:**

1. Synchronous code prints `1`.
2. The timer callback is scheduled.
3. The Promise reaction is queued as a microtask.
4. Synchronous code prints `4`.
5. The Promise microtask runs.
6. The timer callback runs later.

**Memory trick:** Synchronous code → Promise microtasks → timer callbacks.

---

## 3. Single-threading vs Multithreading

### Single-threading

JavaScript normally executes application code on one main thread at a time.

```javascript
function first() {
  console.log("First");
}

function second() {
  console.log("Second");
}

first();
second();
```

**Output:**

```text
First
Second
```

### Multithreading

Multithreading allows work to run on multiple threads. JavaScript environments support workers for suitable tasks.

For example, a browser Web Worker can perform calculations separately from the main thread.

**Common use cases:**

- CPU-heavy calculations
- Image processing
- Large data processing
- Keeping the user interface responsive

**Remember:** Asynchronous code is not necessarily multithreaded code.

---

## 4. Callbacks

A callback is a function passed to another function so it can be called at a chosen point.

```javascript
function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

function welcome() {
  console.log("Welcome to JavaScript!");
}

greet("Ujjwal", welcome);
```

**Output:**

```text
Hello, Ujjwal
Welcome to JavaScript!
```

### Key points

- `welcome` passes the function itself.
- `welcome()` executes the function.
- `callback()` invokes the function received by `greet()`.

Callbacks can be synchronous or asynchronous.

### Callback Hell

Deeply nested callbacks can become difficult to maintain.

```javascript
loginUser(() => {
  getProfile(() => {
    getOrders(() => {
      console.log("All tasks completed");
    });
  });
});
```

Promises and `async/await` often make complex asynchronous workflows easier to read.

---

## 5. Promises

A Promise represents the eventual success or failure of an operation.

### Three states

| State | Meaning |
|---|---|
| Pending | Operation has not settled |
| Fulfilled | Operation succeeded |
| Rejected | Operation failed |

### Example

```javascript
const payment = new Promise((resolve, reject) => {
  const paymentSuccessful = true;

  if (paymentSuccessful) {
    resolve("Payment successful");
  } else {
    reject(new Error("Payment failed"));
  }
});

payment
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));
```

**Output:**

```text
Payment successful
```

### Remember

- `resolve(value)` fulfills a Promise with a value.
- `reject(reason)` rejects a Promise.
- Only the first settlement takes effect.
- A Promise executor runs immediately.
- Promise handlers such as `.then()` run asynchronously as microtasks.

### Simulating an asynchronous operation

```javascript
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 1000);
  });
}

getData().then((data) => console.log(data));
```

**Output after approximately one second:**

```text
Data received
```

---

## 6. then() and catch()

- `.then()` handles fulfillment and can transform a result.
- `.catch()` handles rejection or errors thrown earlier in the Promise chain.

### Promise chaining

```javascript
Promise.resolve(5)
  .then((number) => number * 2)
  .then((number) => number + 10)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

**Output:**

```text
20
```

**Calculation:**

```text
5 → 10 → 20
```

Each `.then()` handler passes its returned value to the next handler. If a handler returns a Promise, the chain waits for it to settle.

---

## 7. async and await

### async

Declares an asynchronous function that always returns a Promise.

### await

Suspends the current async function until the awaited Promise settles. It does not block the main JavaScript thread.

### Example

```javascript
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data loaded");
    }, 1000);
  });
}

async function main() {
  console.log("Start");

  const result = await getData();

  console.log(result);
}

main();
console.log("Other work");
```

**Output:**

```text
Start
Other work
Data loaded
```

### Important rules

1. Code before `await` runs first.
2. The current async function suspends at `await`.
3. Other JavaScript work can continue.
4. The async function resumes when the awaited operation settles.

### async functions return Promises

```javascript
async function getNumber() {
  return 10;
}

getNumber().then((number) => console.log(number));
```

**Output:**

```text
10
```

Although the function returns `10`, the caller receives a Promise fulfilled with that value.

---

## 8. try...catch...finally

Use `try...catch` to handle errors. It is especially useful with `async/await`.

```javascript
async function loadUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const user = await response.json();

    console.log(user.name);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("Request finished");
  }
}

loadUser();
```

### Remember

- `try` — attempts an operation.
- `catch` — handles errors.
- `finally` — runs cleanup code whether the operation succeeds or fails, subject to normal control flow.

**Important:** `fetch()` does not automatically reject for HTTP errors such as `404` or `500`. Check `response.ok`.

---

## 9. setTimeout() and setInterval()

### setTimeout()

Schedules a callback to run once after a delay.

```javascript
setTimeout(() => {
  console.log("Runs once");
}, 2000);
```

### setInterval()

Schedules a callback repeatedly.

```javascript
let count = 1;

const timer = setInterval(() => {
  console.log(count);

  count++;

  if (count > 5) {
    clearInterval(timer);
  }
}, 1000);
```

**Output, approximately once per second:**

```text
1
2
3
4
5
```

### Quick comparison

| Function | Purpose |
|---|---|
| `setTimeout()` | Schedule once |
| `setInterval()` | Schedule repeatedly |
| `clearTimeout()` | Cancel a pending timeout |
| `clearInterval()` | Stop a repeating timer |

Timer delays are not exact execution guarantees.

---

## 10. Fetch, Axios, and XMLHttpRequest

These APIs can make HTTP requests.

### A. Fetch API

Fetch is built into modern browsers.

```javascript
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
```

### B. Axios

Axios is a separate HTTP client library.

Install it:

```bash
npm install axios
```

Example:

```javascript
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
```

### C. XMLHttpRequest

An older API that supports asynchronous HTTP requests.

```javascript
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
    console.error("HTTP error:", xhr.status);
  }
};

xhr.onerror = function () {
  console.error("Network error");
};

xhr.send();
```

### Comparison

| Feature | Fetch | Axios | XMLHttpRequest |
|---|---|---|---|
| Built into modern browsers | Yes | No | Yes |
| Parses JSON automatically | Use `response.json()` | Usually yes | Usually manual |
| Rejects for HTTP error statuses by default | No | Yes | Check status |
| Common approach | Promises | Promises | Events/callbacks |

---

## 11. Concurrency vs Parallelism

### Concurrency

Multiple tasks make progress over overlapping periods. They do not have to execute simultaneously.

```javascript
function taskA() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task A finished");
      resolve();
    }, 2000);
  });
}

function taskB() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task B finished");
      resolve();
    }, 1000);
  });
}

async function main() {
  await Promise.all([taskA(), taskB()]);
  console.log("Both finished");
}

main();
```

**Output:**

```text
Task B finished
Task A finished
Both finished
```

Both timers start before `Promise.all()` waits for the results.

### Parallelism

Tasks execute simultaneously, usually using multiple CPU cores or threads.

Examples include browser Web Workers and Node.js worker threads.

| Concurrency | Parallelism |
|---|---|
| Overlapping progress | Simultaneous execution |
| Can occur on one thread | Typically uses multiple processing units |
| Useful for coordinating I/O | Useful for CPU-heavy work |

**Interview tip:** `Promise.all()` does not itself create threads or guarantee parallel CPU execution.

---

## 12. Throttling vs Debouncing

### Throttling

Limits how frequently a function executes.

```javascript
function throttle(callback, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
}

window.addEventListener(
  "scroll",
  throttle(() => console.log("Scroll handled"), 500)
);
```

This limits execution to at most once per 500 ms while events continue. It does not guarantee a final call after the events stop.

### Debouncing

Waits until events stop for a specified delay.

```javascript
function debounce(callback, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

const search = debounce((text) => {
  console.log("Searching:", text);
}, 500);

search("J");
search("Ja");
search("Java");
search("JavaScript");
```

If all calls happen within 500 ms of one another, only the last search executes.

### Remember

- **Throttling:** Run at a controlled frequency.
- **Debouncing:** Run after activity pauses.

**Use cases:**

- Throttling: scroll events and mouse movement.
- Debouncing: search inputs and autocomplete.

---

## 13. Real-World Use Cases

| Use case | Concepts used |
|---|---|
| Login and authentication | `fetch`, `async/await`, error handling |
| Loading products or jobs | Promises, API requests, loading states |
| Chat application | WebSockets and asynchronous events |
| AI chatbot with React + FastAPI | HTTP requests, `async/await` |
| Payment processing | Promises, response handling, error states |

### React + FastAPI example

```jsx
import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await fetch("http://localhost:8000/jobs");

        if (!response.ok) {
          throw new Error("Unable to load jobs");
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>{job.title}</li>
      ))}
    </ul>
  );
}

export default Jobs;
```

**What this demonstrates:**

1. React starts loading the jobs.
2. `fetch()` sends a request to FastAPI.
3. `await` waits for the response.
4. React stores the received data in state.
5. The component displays the jobs or an error.

The API must return a list containing `id` and `title` fields. Configure CORS if the frontend and backend use different origins.

---

## 14. Interview Questions

### Q1. Is JavaScript synchronous or asynchronous?

JavaScript executes ordinary code synchronously. Asynchronous APIs and Promises allow operations to complete later.

### Q2. What is a callback?

A function passed to another function to be called at a chosen point.

### Q3. What is a Promise?

An object representing the eventual fulfillment or rejection of an operation.

### Q4. What is the difference between `.then()` and `await`?

Both work with Promises. `.then()` uses chained handlers, while `await` makes Promise-based code look sequential inside an async function.

### Q5. Does `await` block JavaScript?

No. It suspends the current async function while other JavaScript work can continue.

### Q6. What is the event loop?

It coordinates when queued callbacks and Promise reactions can execute after synchronous work finishes.

### Q7. What is callback hell?

Deeply nested callbacks that are difficult to read and maintain.

### Q8. What is the difference between concurrency and parallelism?

Concurrency means overlapping progress; parallelism means simultaneous execution.

### Q9. Why use `try...catch` with `async/await`?

To handle rejected Promises and exceptions thrown within the `try` block.

### Q10. What is throttling?

A technique that limits how frequently a function executes.

### Q11. What is debouncing?

A technique that delays execution until a specified period passes without another event.

### Q12. Does `fetch()` reject for a `404` response?

Not by default. Check `response.ok` and throw an error when necessary.

---

## 15. Output-Based Practice

Try to predict each output before running the code.

### Question 1

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");
```

<details>
<summary>Show answer</summary>

```text
A
C
B
```

Synchronous statements execute before the timer callback.

</details>

### Question 2

```javascript
Promise.resolve(5)
  .then((n) => n * 2)
  .then((n) => console.log(n));
```

<details>
<summary>Show answer</summary>

```text
10
```

Each handler passes its returned value to the next handler.

</details>

### Question 3

```javascript
async function test() {
  return "Hello";
}

console.log(test());
```

<details>
<summary>Show answer</summary>

The console displays a Promise object, typically already fulfilled with `"Hello"`.

An async function returns a Promise, not a plain string.

</details>

### Question 4

```javascript
console.log("1");

Promise.resolve().then(() => console.log("2"));

console.log("3");
```

<details>
<summary>Show answer</summary>

```text
1
3
2
```

The Promise handler runs as a microtask after synchronous code.

</details>

### Question 5

```javascript
async function main() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

main();
console.log("C");
```

<details>
<summary>Show answer</summary>

```text
A
C
B
```

The async function suspends at `await` and resumes after the current synchronous code.

</details>

---

## 16. Quick Revision Cheat Sheet

| Concept | Easy memory trick |
|---|---|
| Synchronous | One step at a time |
| Asynchronous | Start work, continue while waiting |
| Callback | Pass a function |
| Promise | Future result |
| `resolve()` | Fulfill |
| `reject()` | Fail |
| `.then()` | Handle fulfillment |
| `.catch()` | Handle errors |
| `async` | Function returns a Promise |
| `await` | Wait inside the async function |
| `try` | Attempt the operation |
| `catch` | Handle the error |
| `finally` | Perform cleanup |
| Event loop | Coordinate queued work |
| `setTimeout()` | Schedule once |
| `setInterval()` | Schedule repeatedly |
| Fetch | Make an HTTP request |
| Concurrency | Overlapping progress |
| Parallelism | Simultaneous execution |
| Throttling | Limit execution frequency |
| Debouncing | Wait for activity to pause |

### The complete async flow

```text
Start
  |
  v
Call API / start async operation
  |
  v
Receive a Promise
  |
  v
await / .then()
  |
  +---- Rejected ----> catch error
  |
  +---- Fulfilled ---> process data
                          |
                          v
                       Update UI
```

---

## 17. Seven-Day Revision Plan

- [ ] **Day 1:** Synchronous vs asynchronous, timers, event loop.
- [ ] **Day 2:** Callbacks and callback hell.
- [ ] **Day 3:** Promises, `.then()`, `.catch()`.
- [ ] **Day 4:** `async/await`, `try...catch...finally`.
- [ ] **Day 5:** Fetch, Axios, API error handling.
- [ ] **Day 6:** Concurrency, parallelism, throttling, debouncing.
- [ ] **Day 7:** Build a small React app that loads jobs from FastAPI and practise interview questions.

---

## Final Learning Rule

**Understand → Predict → Code → Run → Explain → Revise**

Do not memorize code blindly. Write each example yourself, predict its output, run it, and explain why it happens in that order.

If you can explain the output in your own words, you are building real JavaScript understanding for projects and interviews.
