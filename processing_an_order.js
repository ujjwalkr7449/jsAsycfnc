//Real-world example: processing an order
function placeOrder(callback) {
  console.log("Order placed");

  callback();
}

placeOrder(() => {
  console.log("Send confirmation message");
});