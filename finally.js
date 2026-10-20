try {
  console.log("Processing payment");
  throw new Error("Payment failed");
} catch (error) {
  console.log(error.message);
} finally {
  console.log("Payment process ended");
}