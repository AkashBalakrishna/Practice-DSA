# Patterns for Solving coding problems
***

### 1. Frequency Counter / Hash Map 📊
This pattern uses an object or a `Map` to count the occurrences of elements. It's incredibly useful for problems involving anagrams, duplicates, or comparing the contents of two data sets.

* **When to use it**: When you need to count things, check for duplicates, or find anagrams.
* **Template**:
    ```javascript
    const str = "hello";
    const freqMap = new Map();

    for (const char of str) {
      // Get the current count (or 0 if it doesn't exist) and increment it
      freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }

    // freqMap will be: Map(4) { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }
    ```
* **Common Problems**: Valid Anagram, Ransom Note, Two Sum.

---

### 2. Two Pointers ↔️
This technique uses two pointers to iterate through an array from different directions (or at different speeds) to find a pair or a set of elements that fit a certain condition. It's most effective on **sorted arrays**.

* **When to use it**: On sorted arrays to find pairs with a certain sum, or problems like trapping rain water.
* **Template (Converging Pointers)**:
    ```javascript
    const sortedArr = [1, 2, 4, 6, 8, 9];
    let left = 0;
    let right = sortedArr.length - 1;
    const target = 10;

    while (left < right) {
      const sum = sortedArr[left] + sortedArr[right];

      if (sum === target) {
        // Found the pair!
        console.log(sortedArr[left], sortedArr[right]);
        break;
      } else if (sum < target) {
        // Sum is too small, need a larger number
        left++;
      } else {
        // Sum is too large, need a smaller number
        right--;
      }
    }
    ```
* **Common Problems**: Two Sum II, Container With Most Water, Valid Palindrome.

---

### 3. Sliding Window 🖼️
This pattern involves creating a "window" over a portion of an array or string and then moving that window to solve problems involving contiguous subsets.

* **When to use it**: For problems asking for the longest/shortest/best subarray or substring that satisfies a condition.
* **Template (Dynamic Window)**:
    ```javascript
    const arr = [1, 3, 2, 6, -1, 4, 1, 8, 2];
    let windowStart = 0;
    let currentSum = 0;
    let minLength = Infinity;
    const targetSum = 7;

    for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
      // Add the next element to the window
      currentSum += arr[windowEnd];

      // Shrink the window as long as the condition is met
      while (currentSum >= targetSum) {
        // Update the result
        minLength = Math.min(minLength, windowEnd - windowStart + 1);
        
        // Remove the element going out of the window
        currentSum -= arr[windowStart];
        windowStart++;
      }
    }
    // minLength will hold the length of the smallest subarray with a sum >= 7
    ```
* **Common Problems**: Max Sum Subarray of Size K, Longest Substring Without Repeating Characters.

---

### 4. Binary Search 🔍
An efficient algorithm ($O(\log n)$) to find an element's position in a **sorted** array.

* **When to use it**: Any time you are searching for an element in a sorted collection.
* **Template**:
    ```javascript
    const sortedArr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
    const target = 23;
    let left = 0;
    let right = sortedArr.length - 1;

    while (left <= right) {
      // Use this formula for mid to prevent potential integer overflow
      const mid = Math.floor(left + (right - left) / 2);

      if (sortedArr[mid] === target) {
        // Target found!
        console.log(`Found at index ${mid}`);
        break;
      } else if (sortedArr[mid] < target) {
        // Search in the right half
        left = mid + 1;
      } else {
        // Search in the left half
        right = mid - 1;
      }
    }
    ```
* **Common Problems**: Search in Rotated Sorted Array, Find Minimum in Rotated Sorted Array.

---

### 5. Graph Traversal: BFS (Breadth-First Search) 🗺️
BFS explores a graph level by level. It uses a **queue** to keep track of the nodes to visit next.

* **When to use it**: To find the shortest path in an unweighted graph, level-order traversal of a tree, or web crawling.
* **Template**:
    ```javascript
    function bfs(graph, startNode) {
      const queue = [startNode]; // Use array as a queue
      const visited = new Set([startNode]);

      while (queue.length > 0) {
        const currentNode = queue.shift(); // Dequeue

        // Process the current node (e.g., print it)
        console.log(currentNode);

        for (const neighbor of graph[currentNode]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor); // Enqueue
          }
        }
      }
    }
    ```
* **Common Problems**: Number of Islands, Binary Tree Level Order Traversal, Word Ladder.

---

### 6. Tree Traversal: DFS (Depth-First Search) 🌲
DFS explores a tree or graph by going as deep as possible down one branch before backing up. It is most elegantly implemented using **recursion**.

* **When to use it**: To check connectivity, find a path, or perform tree traversals (in-order, pre-order, post-order).
* **Template (Recursive)**:
    ```javascript
    // First, define a simple tree node
    class TreeNode {
      constructor(val, left = null, right = null) {
        this.val = val; this.left = left; this.right = right;
      }
    }

    function dfs(node) {
      if (!node) {
        return; // Base case: stop if the node is null
      }
      
      // Pre-order: Process node, then go left, then right
      console.log(node.val);
      dfs(node.left);
      dfs(node.right);
      
      // In-order: Go left, process node, then go right
      // dfs(node.left);
      // console.log(node.val);
      // dfs(node.right);
    }
    ```
* **Common Problems**: Maximum Depth of Binary Tree, Validate Binary Search Tree, Path Sum.

---

### 7. Backtracking / Recursion 🧩
A general algorithm for finding all (or some) solutions to a computational problem, notably for constraint satisfaction problems. It incrementally builds candidates for the solutions and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution.

* **When to use it**: For problems involving permutations, combinations, or subsets.
* **Template**:
    ```javascript
    function findSubsets(nums) {
      const result = [];
      
      function backtrack(currentSubset, startIndex) {
        // 1. Add the current path/subset to the result
        result.push([...currentSubset]);

        // 2. Explore further choices
        for (let i = startIndex; i < nums.length; i++) {
          // Choose: Add the element
          currentSubset.push(nums[i]);
          
          // Explore: Recurse with the new state
          backtrack(currentSubset, i + 1);
          
          // Unchoose (Backtrack): Remove the element to try other paths
          currentSubset.pop();
        }
      }

      backtrack([], 0);
      return result;
    }
    ```
* **Common Problems**: Subsets, Permutations, Combination Sum, N-Queens.
