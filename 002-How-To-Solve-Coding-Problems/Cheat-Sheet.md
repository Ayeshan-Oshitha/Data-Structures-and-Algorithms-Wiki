# Cheat Sheet

## Step by Step Through a Problem

**Understand the problem**

1. **Write down the key points** at the top (e.g. "sorted array"). Get all the details.
2. **Check the inputs and outputs.** What goes in? What comes out?
3. **Find what matters most.** Time? Memory? What is the main goal?
4. **Don't ask too many questions.**

**Plan the solution**

5. **Start with the simple (brute force) idea.** The first idea that comes to mind. Just say it, don't code it.
6. **Say why it's not the best.** e.g. `O(n^2)`, hard to read.
7. **Walk through your idea and find the slow parts.**
   - Any repeated work or extra work?
   - Did you use all the info you were given?
   - The **bottleneck** = the part with the biggest Big O. Fix that first.
8. **Write down the steps** before you code.

**Write the code**

9. **Split code into small functions.** Add comments only if needed.
10. **Now write the code.**
    - Never start coding if you're not sure how it will work.
    - You may not finish in time. Show what you **can** do.
    - Forgot a method? Make up a function name and move on.
    - Start with the easy part.
11. **Check for bad input.**
    - Never trust the input. Think: "Someone is trying to break my code."
    - Tip: write the checks as comments, then tell the interviewer you'd write tests for them.
12. **Use clear names.** Not `i` and `j`.

**Check and improve**

13. **Test your code** with: no input, `0`, `undefined`, `null`, very big arrays, async code.
    - Ask what you can assume about the input.
    - Look for weak spots and repeated code.
14. **Talk about how to improve it.**
    - Does it work? Is it readable? Other ways to solve it?
    - How can it be faster? What would you Google?
    - Ask: "What's the most interesting solution you've seen?"
15. **Be ready for follow-up questions.**
    - e.g. "What if the input is too big to fit in memory?"
    - Answer: **split it into pieces** (divide and conquer). Read one piece at a time from disk, save the results, then combine them.
    - Google asks this a lot because they care about big data.

> **Key idea:** In an interview, the steps matter more than the code: **understand → plan → code → test → improve**.
