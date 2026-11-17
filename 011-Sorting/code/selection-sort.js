function selectionSort(arr) {
  const length = arr.length;
  for (let i = 0; i <= length - 2; i++) {
    let minIndex = i;
    for (let j = i + 1; j <= length - 1; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

const array = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];
console.log(selectionSort(array));
