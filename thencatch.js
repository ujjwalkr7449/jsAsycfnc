const promise = new Promise((resolve, reject) => {
  const marks = 80;

  if (marks >= 40) {
    resolve("You passed");
  } else {
    reject("You failed");
  }
});

promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });