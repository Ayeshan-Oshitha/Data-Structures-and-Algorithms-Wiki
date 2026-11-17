# Quick Sort

## Quick Sort

- Like merge sort, quick sort uses **divide and conquer**, so it's usually **O(n log n)**.
- It uses a **pivot** to split the list into smaller lists.

### How quick sort works

1. Pick a **pivot** (here, the **last item**).
2. Move every number **smaller** than the pivot to its **left**, and every number **bigger** to its **right**.
3. Now the pivot is in its **final place**.
4. Do the same to the **left part** and the **right part**, again and again (like a tree), until every part is sorted.

- **How to pick the pivot?** It depends on the situation. The lecture uses the last item.
- There are **many ways** to write quick sort, but the pivot idea is always the same.

### Big O

| Best and average | Worst     | Space        |
| ---------------- | --------- | ------------ |
| **O(n log n)**   | **O(n²)** | **O(log n)** |

- **Space O(log n):** better than merge sort's O(n), but not as good as bubble, insertion or selection sort's O(1).
- **Worst case O(n²):** when the pivot is the **smallest or biggest** number, the list doesn't split in half (one side is empty).
- **Example:** an **already sorted** list with the **first or last** item as the pivot. Every split is bad, so it's very slow.
- So **pick the pivot carefully**, based on your list.

### Quick sort vs merge sort

- Quick sort and merge sort are the **most used** sorting algorithms.
- **Quick sort:** usually the **fastest on average**, and uses less memory. But it has a **bad worst case**.
- **Merge sort:** always O(n log n). Use it if you **can't guarantee a good pivot**, or the data might be bad.

> **Key idea:** Quick sort puts a pivot in its final place, with smaller numbers left and bigger numbers right, then repeats on each side. Usually the fastest, O(n log n), but O(n²) with a bad pivot.

## Optional Exercise: Quick Sort

### Textbook version (code by Claude)

- The standard textbook quick sort (called **Lomuto partition**). The pivot is the **last item**, and it sorts **in place** (no new arrays).

<!-- prettier-ignore -->
```js
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {                    // 2 or more items left in this part
    const p = partition(arr, low, high); // pivot goes to its final place p
    quickSort(arr, low, p - 1);        // sort the left part
    quickSort(arr, p + 1, high);       // sort the right part
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];             // pivot = last item
  let i = low - 1;                     // end of the "smaller than pivot" area
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {              // smaller? move it into the smaller area
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // put pivot right after the smaller area
  return i + 1;                        // pivot's final index
}

quickSort([3, 7, 8, 5, 2, 1, 9, 5, 4]); // [1, 2, 3, 4, 5, 5, 7, 8, 9]
```

- **`partition`:** walks through the part. Every number **smaller** than the pivot is swapped to the **front**. At the end, the pivot is swapped in **right after** them, which is its final place.
- **`quickSort`:** after partition, it calls itself on the **left part** (`low` to `p - 1`) and the **right part** (`p + 1` to `high`).
- **Base case:** `low < high` is false when a part has 0 or 1 items, so it stops.
- `[a, b] = [b, a]` is a short way to **swap** 2 items in JavaScript.

**Step by step, exactly as the code runs:**

<img src="../assets/section-11/quick-sort-steps-full.png" alt="Every step of the textbook quick sort on 3, 7, 8, 5, 2, 1, 9, 5, 4. Six partition calls are shown one row per j step. Call 1 partition 0 to 8 with pivot 4: 3, 2 and 1 are swapped into the smaller area and 4 lands at index 3. Call 2 partition 0 to 2 with pivot 1: 1 lands at index 0. Call 3 partition 1 to 2 with pivot 3: 3 lands at index 2, and 2 is a single number. Call 4 partition 4 to 8 with pivot 5: nothing is smaller, so 5 lands at index 4. Call 5 partition 5 to 8 with pivot 7: 5 is swapped forward and 7 lands at index 6. Call 6 partition 7 to 8 with pivot 9: 9 lands at index 8, and 8 is a single number. Result 1 2 3 4 5 5 7 8 9" width="900">

**Which code line runs when:**

<img src="../assets/section-11/quick-sort-trace.png" alt="Line by line trace of quickSort on 3, 7, 8, 5, 2, 1, 9, 5, 4. The code lines are labelled A if low less than high, B partition, C sort left part, D sort right part, E return. Each call is indented inside the call that is waiting for it. Line B places a pivot, then line C pauses until the whole left part is sorted, then line D does the right part. Calls with 0 or 1 numbers stop at line A. The pivots land in order: 4 at index 3, 1 at index 0, 3 at index 2, 5 at index 4, 7 at index 6, 9 at index 8. Result 1 2 3 4 5 5 7 8 9" width="900">
