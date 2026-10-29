// my solution

function firstRecurringCharacter(numbersArray: number[]): number | undefined {
  const seen = new Set<number>();

  for (let i = 0; i < numbersArray.length; i++) {
    if (seen.has(numbersArray[i])) {
      return numbersArray[i];
    }
    seen.add(numbersArray[i]);
  }

  return undefined;
}

console.log(firstRecurringCharacter([2, 5, 1, 2, 3, 4, 1, 2, 4]));
console.log(firstRecurringCharacter([2, 1, 1, 2, 3, 5, 1, 2, 4]));
console.log(firstRecurringCharacter([2, 3, 4, 5]));
