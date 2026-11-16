function fibonacciRecursive(n) {
  if (n == 0) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }

  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

function fibonacciIterative(n) {
  let sum;
  let prevSum;
  for (let i = 0; i <= n; i++) {
    if (i === 0) {
      sum = 0;
      prevSum = 0;
    } else if (i === 1) {
      sum = 1;
      prevSum = 0;
    } else {
      let temp = sum;
      sum = sum + prevSum;
      prevSum = temp;
    }
  }

  return sum;
}
