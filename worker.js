self.onmessage = (event) => {
  const number = event.data;
  self.postMessage(number * number);
};