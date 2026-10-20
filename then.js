Promise.resolve(5)
  .then((number) => {
    return number * 2;
  })
  .then((number) => {
    return number + 10;
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });