function findFactorialRecursive(number) {
  //O(n)
  if (number === 1) {
    return 1;
  }
  return number * findFactorialRecursive(number - 1);
}

function findFactorialIterative(number) {
  //O(n)
  let sum = 1;
  for (let i = 1; i <= number; i++) {
    sum = sum * i;
  }
  return sum;
}
