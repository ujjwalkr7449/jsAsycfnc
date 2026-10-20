//7. Promises
/*const order = new Promise((resolve, reject) => {
  const paymentSuccessful = true;

  if (paymentSuccessful) {
    resolve("Payment successful");
  } else {
    reject("Payment failed");
  }
});

console.log(order); */


const order = new Promise((resolve, reject) => {
  const paymentSuccessful = true;

  if (paymentSuccessful) {
    resolve("Payment successful");
  } else {
    reject("Payment failed");
  }
});

console.log(order);

//To handle the result, use .then() and .catch().
const order = new Promise((resolve, reject) => {
  const paymentSuccessful = true;

  if (paymentSuccessful) {
    resolve("Payment successful");
  } else {
    reject("Payment failed");
  }
});

order
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });