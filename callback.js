//What is callback hell?
//Nested callbacks can become difficult to read and maintain.


loginUser(() => {
  getProfile(() => {
    getOrders(() => {
      getPaymentDetails(() => {
        console.log("Everything completed");
      });
    });
  });
});