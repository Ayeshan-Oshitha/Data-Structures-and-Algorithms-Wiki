# Sorting Interview

## Exercise: Sorting Interview

- **Task:** for each situation, pick the best sorting algorithm and explain why.

1. Sort 10 schools around your house by distance
2. eBay sorts listings by the current bid amount
3. Sort scores on ESPN
4. Massive database (can't fit all into memory) needs to sort through past year's user data
5. Almost sorted Udemy review data needs to update and add 2 new reviews
6. Temperature records for the past 50 years in Canada
7. Large user name database needs to be sorted. Data is very random.
8. You want to teach sorting for the first time

## Solution: Sorting Interview

| # | Situation | Sort | Why |
| --- | --- | --- | --- |
| 1 | 10 schools by distance | **Insertion sort** | Small input. Simple, fast on small lists, O(1) space. The list may also be nearly sorted already. |
| 2 | eBay bids | **Radix or counting sort** | Bids are **whole numbers in a fixed range** (say $1 to $50,000), so it can beat O(n log n). |
| 3 | ESPN scores | **Quick sort** | Lots of scores in many formats, some with decimals, so radix sort won't work. Sorting in memory, so quick sort's smaller space beats merge sort. The worst case is unlikely, because the scores won't be pre-sorted. |
| 4 | Massive database, doesn't fit in memory | **Merge sort** | **External sorting** (outside memory), so space matters less. The data is huge, so you want a **guaranteed** O(n log n), not quick sort's O(n²) worst case. |
| 5 | Almost sorted Udemy reviews + 2 new | **Insertion sort** | The old data is already sorted. Insertion sort is the best on almost sorted lists. |
| 6 | Temperatures, 50 years, Canada | **Radix or counting sort** if whole numbers. **Quick sort** if they have decimals. | Whole temperatures (like −32 to 40) are integers in a small range. Decimals rule out radix and counting sort, so use quick sort to save memory. |
| 7 | Large, very random user names | **Merge sort** or **quick sort** | Not enough info. Merge sort if memory is cheap. Quick sort to save memory, if you're not worried about the worst case. |
| 8 | Teach sorting for the first time | **Bubble sort** or **selection sort** | Simple to understand. Only used for teaching. |

- **There can be more than one right answer.** In an interview, the key is to **explain why**. If you know the principles, the interviewer can see you understand.

> **Key idea:** Pick the sort from the data: small or almost sorted → insertion. Whole numbers in a small range → radix or counting. Huge data or worst case matters → merge. In memory and usually random → quick. Always explain your choice.
