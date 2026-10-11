function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
  let mergedArray: number[] = [];

  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      mergedArray.push(arr1[i]);
      i++;
    } else {
      mergedArray.push(arr2[j]);
      j++;
    }
  }

  if (i < arr1.length) {
    while (i < arr1.length) {
      mergedArray.push(arr1[i]);
      i++;
    }
  }

  if (j < arr2.length) {
    while (j < arr2.length) {
      mergedArray.push(arr2[j]);
      j++;
    }
  }

  return mergedArray;
}

console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));
