//try...catch is used to handle errors. It is especially useful when working with async/await.
try {
  const result = 10 / 0;

  console.log(result);
} catch (error) {
  console.log("Something went wrong");
}