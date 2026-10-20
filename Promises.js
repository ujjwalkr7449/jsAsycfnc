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