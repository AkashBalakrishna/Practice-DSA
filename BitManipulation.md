### Bit Manipulation Cheatsheet 🧙‍♂️

Bit manipulation is a powerful technique for solving problems by working at the level of individual bits. It often leads to highly efficient and elegant solutions.

---

### ## Core Bitwise Operators

Understanding these operators is the first step. Let `x = 5 (0101)` and `y = 3 (0011)`.

| Operator | Syntax | Example (`x op y`) | Result | Use Case |
| :--- | :---: | :---: | :---: | :--- |
| **AND** | `&` | `0101 & 0011` | `0001` (1) | Check if a bit is set; clear bits. |
| **OR** | `|` | `0101 | 0011` | `0111` (7) | Set a bit. |
| **XOR** | `^` | `0101 ^ 0011` | `0110` (6) | Toggle a bit; find unique numbers. |
| **NOT** | `~` | `~0101` | `...1010` (-6) | Invert all bits. |
| **Left Shift** | `<<` | `0101 << 1` | `1010` (10) | Multiply by $2^k$. |
| **Right Shift** | `>>` | `0101 >> 1` | `0010` (2) | Divide by $2^k$ (floor). |

---

### ## Common Bitmasking Techniques

A "mask" is an integer used with bitwise operators to manipulate specific bits.

#### ### 1. Get, Set, Clear, and Toggle a Bit
These are the fundamental CRUD operations for bits. Let's work on the `i`-th bit of a number `n`.

* **Get Bit**: Check if the `i`-th bit is set.
    ```javascript
    // Is the 2nd bit (from right, 0-indexed) of 5 (0101) set?
    const n = 5;       // 0101
    const i = 2;
    const mask = 1 << i; // 0100
    const isSet = (n & mask) !== 0; // (0101 & 0100) -> 0100 (true)
    ```

* **Set Bit**: Force the `i`-th bit to be 1.
    ```javascript
    // Set the 1st bit of 5 (0101)
    const n = 5;       // 0101
    const i = 1;
    const mask = 1 << i; // 0010
    const result = n | mask; // 0101 | 0010 -> 0111 (7)
    ```

* **Clear Bit**: Force the `i`-th bit to be 0.
    ```javascript
    // Clear the 2nd bit of 5 (0101)
    const n = 5;       // 0101
    const i = 2;
    const mask = ~(1 << i); // ~(0100) -> ...1011
    const result = n & mask; // 0101 & ...1011 -> 0001 (1)
    ```

* **Toggle Bit**: Flip the `i`-th bit.
    ```javascript
    // Toggle the 0th bit of 5 (0101)
    const n = 5;       // 0101
    const i = 0;
    const mask = 1 << i; // 0001
    const result = n ^ mask; // 0101 ^ 0001 -> 0100 (4)
    ```

#### ### 2. Useful Tricks & Snippets

* **Check if a number is a power of two**:
    A power of two has exactly one bit set. `n - 1` flips this bit and all trailing zeros.
    ```javascript
    function isPowerOfTwo(n) {
      return n > 0 && (n & (n - 1)) === 0;
    }
    // isPowerOfTwo(8) -> 8 (1000) & 7 (0111) -> 0 (true)
    ```

* **Count Set Bits (Hamming Weight)**:
    Brian Kernighan's algorithm repeatedly flips the least significant bit until the number is 0.
    ```javascript
    function countSetBits(n) {
      let count = 0;
      while (n > 0) {
        n = n & (n - 1); // This clears the LSB
        count++;
      }
      return count;
    }
    // countSetBits(7) -> 7(0111) -> 6(0110) -> 4(0100) -> 0. Count = 3.
    ```

* **XOR Swap**:
    Swap two numbers without a temporary variable.
    ```javascript
    let a = 5, b = 3;
    a = a ^ b; // a = 6 (0110)
    b = a ^ b; // b = 6 ^ 3 = 5
    a = a ^ b; // a = 6 ^ 5 = 3
    ```

---

### ## Advanced Patterns & Problems

#### ### 1. Generating Subsets (Power Set)
Iterate from `0` to `2^n - 1`. Each number `i` in this range acts as a bitmask representing a unique subset. If the `j`-th bit of `i` is set, include the `j`-th element of the original set.

* **Template**:
    ```javascript
    function generateSubsets(nums) {
      const n = nums.length;
      const subsets = [];
      const numSubsets = 1 << n; // 2^n

      for (let i = 0; i < numSubsets; i++) {
        const currentSubset = [];
        for (let j = 0; j < n; j++) {
          // Check if the j-th bit is set in i
          if ((i >> j) & 1) {
            currentSubset.push(nums[j]);
          }
        }
        subsets.push(currentSubset);
      }
      return subsets;
    }
    // generateSubsets([1, 2]) -> [[], [1], [2], [1, 2]]
    ```

#### ### 2. Finding the Single Unique Number
The XOR operator has two key properties: `x ^ x = 0` and `x ^ 0 = x`. If you XOR all numbers in a list where every number appears twice except one, the pairs will cancel out, leaving the unique number.

* **Template (Single Number - LeetCode #136)**:
    ```javascript
    function singleNumber(nums) {
      let result = 0;
      for (const num of nums) {
        result ^= num;
      }
      return result;
    }
    // singleNumber([4, 1, 2, 1, 2]) -> (4^1^2^1^2) -> (4^(1^1)^(2^2)) -> (4^0^0) -> 4
    ```
