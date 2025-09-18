### String & Array Problem Patterns Cheatsheet 📝

This guide covers the most common patterns, methods, and advanced problems for strings and arrays in coding interviews.

---

### ## Common Foundational Patterns

These are the essential building blocks for a wide range of problems.

#### ### 1. Two Pointers ↔️
This pattern uses two indices to iterate through data, either converging, diverging, or moving in the same direction.

* **When to use**: Problems involving palindromes, finding pairs in a **sorted** array, or comparing elements from opposite ends.
* **Converging Pointers Template (e.g., Palindrome Check)**:
    ```javascript
    function isPalindrome(s) {
      let left = 0;
      let right = s.length - 1;

      while (left < right) {
        if (s[left] !== s[right]) {
          return false;
        }
        left++;
        right--;
      }
      return true;
    }
    ```

#### ### 2. Sliding Window 🖼️
This pattern creates a "window" over a **contiguous** portion of data, which slides to find an optimal result.

* **When to use**: Finding the longest/shortest/best contiguous subarray or substring that satisfies a condition.
* **Dynamic Window Template (e.g., Smallest Subarray with Sum >= Target)**:
    ```javascript
    function smallestSubarray(arr, targetSum) {
      let windowStart = 0;
      let currentSum = 0;
      let minLength = Infinity;

      for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        currentSum += arr[windowEnd]; // Expand the window

        while (currentSum >= targetSum) { // Shrink from the left
          minLength = Math.min(minLength, windowEnd - windowStart + 1);
          currentSum -= arr[windowStart];
          windowStart++;
        }
      }
      return minLength === Infinity ? 0 : minLength;
    }
    ```

#### ### 3. Frequency Counter (Hash Map) 📊
This pattern uses an object or `Map` to count the occurrences of elements.

* **When to use**: Problems involving anagrams, checking for duplicates, or comparing the composition of two inputs.
* **Template (e.g., Valid Anagram)**:
    ```javascript
    function isAnagram(s1, s2) {
      if (s1.length !== s2.length) return false;
      const counts = {};

      for (const char of s1) {
        counts[char] = (counts[char] || 0) + 1;
      }

      for (const char of s2) {
        if (!counts[char]) return false;
        counts[char]--;
      }
      return true;
    }
    ```

#### ### 4. Prefix Sum / Running Total ➕
Pre-calculate sums to quickly find the sum of any subarray in constant time.

* **When to use**: When you need to perform many sum queries on a static array.
* **Template**:
    ```javascript
    const nums = [1, 2, 3, 4, 5];
    const prefixSum = [0];
    for (let i = 0; i < nums.length; i++) {
      prefixSum[i + 1] = prefixSum[i] + nums[i];
    }
    // To get sum of subarray from index i to j:
    // const subarraySum = prefixSum[j + 1] - prefixSum[i];
    ```

---

### ## Advanced & Specialized Patterns

#### ### 1. Kadane's Algorithm (Maximum Subarray Sum) 📈
A linear time DP approach to find the contiguous subarray with the largest sum.

* **When to use**: Specifically for the **maximum sum of a contiguous subarray** problem.
* **Template**:
    ```javascript
    function maxSubarraySum(arr) {
      let maxSoFar = -Infinity;
      let maxEndingHere = 0;

      for (const num of arr) {
        maxEndingHere += num;
        if (maxSoFar < maxEndingHere) {
          maxSoFar = maxEndingHere;
        }
        if (maxEndingHere < 0) {
          maxEndingHere = 0;
        }
      }
      return maxSoFar;
    }
    ```

#### ### 2. Matrix Manipulation (2D Arrays) 🌀
Patterns for traversing or modifying 2D arrays.

* **When to use**: Grid or matrix problems like rotating an image or maze traversal.
* **Spiral Traversal Template**:
    ```javascript
    function spiralOrder(matrix) {
      const result = [];
      if (!matrix.length) return result;
      let top = 0, bottom = matrix.length - 1;
      let left = 0, right = matrix[0].length - 1;

      while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) result.push(matrix[top][i]);
        top++;
        for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
        right--;
        if (top <= bottom) {
          for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
          bottom--;
        }
        if (left <= right) {
          for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
          left++;
        }
      }
      return result;
    }
    ```

#### ### 3. Interval Problems (Merging & Scheduling) 🗓️
A common category of problems involving a list of `[start, end]` intervals.

* **Key Insight**: Almost always, the first step is to **sort the intervals by their start time**.
* **Merge Intervals Template**:
    ```javascript
    function mergeIntervals(intervals) {
      if (intervals.length < 2) return intervals;
      intervals.sort((a, b) => a[0] - b[0]);
      
      const merged = [intervals[0]];
      for (let i = 1; i < intervals.length; i++) {
        const lastMerged = merged[merged.length - 1];
        const current = intervals[i];
        
        if (current[0] <= lastMerged[1]) {
          lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
          merged.push(current);
        }
      }
      return merged;
    }
    ```

#### ### 4. Cyclic Sort 🔄
An in-place $O(n)$ pattern for arrays containing numbers in a specific range (e.g., `1` to `n`).

* **When to use**: Finding a **missing number**, a **duplicate number**, or **corrupt pairs** in $O(1)$ space.
* **Template**:
    ```javascript
    function cyclicSort(nums) {
      let i = 0;
      while (i < nums.length) {
        const correctIndex = nums[i] - 1;
        if (nums[i] !== nums[correctIndex]) {
          [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
          i++;
        }
      }
      return nums;
    }
    ```

---

### ## Frequently Asked Advanced Problem Example

#### ### Trapping Rain Water (LeetCode #42)
* **Problem Statement**: Given an elevation map (array of integers), compute how much water it can trap.
* **Key Pattern**: **Two Pointers (Optimized)**
* **Approach**: Use `left` and `right` pointers at the ends, and `leftMax`/`rightMax` to track the highest wall seen so far. Move the pointer pointing to the smaller wall inward, calculating trapped water based on the corresponding max wall height.
* **Code Snippet**:
    ```javascript
    function trap(height) {
      if (height.length === 0) return 0;
      let left = 0, right = height.length - 1;
      let leftMax = 0, rightMax = 0;
      let totalWater = 0;

      while (left < right) {
        if (height[left] < height[right]) {
          if (height[left] >= leftMax) {
            leftMax = height[left];
          } else {
            totalWater += leftMax - height[left];
          }
          left++;
        } else {
          if (height[right] >= rightMax) {
            rightMax = height[right];
          } else {
            totalWater += rightMax - height[right];
          }
          right--;
        }
      }
      return totalWater;
    }
    ```

---

### ## Essential Built-in Methods

| Method | Type | Description | Mutates? | Time Complexity |
| :--- | :---: | :--- | :---: | :---: |
| **`.slice(start, end)`** | Both | Extracts a portion into a **new** string/array. | No | $O(k)$ |
| **`.splice(start, del, ...)`** | Array | **Changes** the array by removing/replacing/adding. | Yes | $O(n)$ |
| **`.split(separator)`** | String | Splits a string into an array of substrings. | No | $O(n)$ |
| **`.join(separator)`** | Array | Joins array elements into a single string. | No | $O(n)$ |
| **`.map(callback)`** | Array | Creates a **new** array by transforming each element. | No | $O(n)$ |
| **`.filter(callback)`**| Array | Creates a **new** array with elements that pass a test. | No | $O(n)$ |
| **`.reduce(cb, initial)`**| Array | Reduces an array to a single value. | No | $O(n)$ |
| **`.sort(compareFn)`** | Array | Sorts the elements of an array. | Yes | $O(n \log n)$ |
| **`.includes(val)`** | Both | Checks if a value is present. | No | $O(n)$ |

*(k = number of elements extracted, n = total number of elements)*
