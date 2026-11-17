function bubbleSort(arr) {
  const length = arr.length;
  for (let i = 0; i <= length - 2; i++) {
    for (let j = 0; j <= length - 2; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const array = [1, 35, 2, 7, 8, 23, 11, 89, 0];
console.log(bubbleSort(array));
