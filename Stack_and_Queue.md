### Stacks & Queues: Interview Cheatsheet & Patterns 🥞🚶

This guide covers the essential patterns and problems for stacks (LIFO) and queues (FIFO) that frequently appear in coding interviews.

---

### ## The Cheatsheet

#### ### Stack: Last-In, First-Out (LIFO)
A stack is like a pile of plates. The last plate you add is the first one you take off.

* **Analogy**: A stack of plates, browser history (back button), function call stack.
* **Core Operations**:
    * `push(item)`: Add an item to the **top**.
    * `pop()`: Remove and return the item from the **top**.
    * `peek()`: Look at the top item without removing it.
* **JS Implementation**: An array is perfect. `push` and `pop` are both $O(1)$.
    ```javascript
    const stack = [];
    stack.push(10); // stack is [10]
    stack.push(20); // stack is [10, 20]
    const topItem = stack.pop(); // topItem is 20, stack is [10]
    ```

#### ### Queue: First-In, First-Out (FIFO)
A queue is like a line at a store. The first person in line is the first person to be served.

* **Analogy**: A checkout line, a printer queue, event processing.
* **Core Operations**:
    * `enqueue(item)`: Add an item to the **back**.
    * `dequeue()`: Remove and return the item from the **front**.
    * `peek()`: Look at the front item without removing it.
* **JS Implementation**: An array can be used, but `shift()` is an $O(n)$ operation.
    ```javascript
    const queue = [];
    queue.push(10); // enqueue, queue is [10]
    queue.push(20); // enqueue, queue is [10, 20]
    const frontItem = queue.shift(); // dequeue, frontItem is 10, queue is [20]
    ```

---

### ## Must-Know Stack Problem Patterns

Stacks are ideal for problems that involve reversing order, matching pairs, or backtracking.

#### ### 1. Valid Parentheses (Matching Pairs)

* **Problem**: Given a string of brackets `()[]{}`, determine if it's valid.
* **Key Pattern**: Use a stack to track opening brackets. When you encounter a closing bracket, it must match the most recently opened one.
* **Approach**:
    1.  Iterate through the string.
    2.  If you see an **opening** bracket, `push` it onto the stack.
    3.  If you see a **closing** bracket, `pop` from the stack and check if it’s the correct matching pair. If the stack is empty or the pair doesn't match, return `false`.
    4.  After the loop, the stack must be **empty** for the string to be valid.
* **Code Snippet**:
    ```javascript
    function isValid(s) {
      const stack = [];
      const map = { ")": "(", "}": "{", "]": "[" };
      for (const char of s) {
        if (map[char]) { // It's a closing bracket
          if (stack.length === 0 || stack.pop() !== map[char]) {
            return false;
          }
        } else { // It's an opening bracket
          stack.push(char);
        }
      }
      return stack.length === 0;
    }
    ```

#### ### 2. Monotonic Stack (Next Greater Element)

* **Problem**: For each element in an array, find the first element to its right that is larger.
* **Key Pattern**: A **monotonic stack** maintains elements in a specific order (e.g., decreasing). It processes elements in a single pass.
* **Approach**:
    1.  Use a stack to store **indices** of elements in decreasing order of value.
    2.  Iterate through the array. For each `element`:
    3.  While the stack is not empty and the current `element` is greater than the element at the index on top of the stack:
        * The current `element` is the "next greater element" for the index at the top.
        * Pop the stack and update the result for that popped index.
    4.  Push the current `element`'s index onto the stack.
* **Code Snippet**:
    ```javascript
    function nextGreaterElement(nums) {
      const result = new Array(nums.length).fill(-1);
      const stack = []; // Stores indices

      for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
          const index = stack.pop();
          result[index] = nums[i];
        }
        stack.push(i);
      }
      return result;
    }
    ```

#### ### 3. Simplify Path (Path Traversal)

* **Problem**: Simplify a Unix-style absolute file path.
* **Key Pattern**: A stack perfectly models the behavior of a file system directory structure. Entering a directory is a `push`, and `..` (moving up) is a `pop`.
* **Approach**:
    1.  Split the path by `/`.
    2.  Iterate through the components:
        * If `..`, pop from the stack.
        * If `.` or empty, do nothing.
        * Otherwise, push the component onto the stack.
    3.  Join the stack elements with `/` to form the result.
* **Code Snippet**:
    ```javascript
    function simplifyPath(path) {
      const components = path.split('/');
      const stack = [];
      for (const component of components) {
        if (component === '..') {
          stack.pop();
        } else if (component && component !== '.') {
          stack.push(component);
        }
      }
      return '/' + stack.join('/');
    }
    ```

---

### ## Must-Know Queue Problem Patterns

Queues are perfect for processing items in the order they were received, exploring level by level, or managing sliding windows.

#### ### 1. Breadth-First Search (BFS Traversal)

* **Problem**: Traverse a tree or graph level by level.
* **Key Pattern**: A queue is the fundamental data structure for BFS. It stores the nodes to visit in the next level, ensuring an orderly, level-by-level exploration.
* **Approach**:
    1.  Add the starting `root` node to the queue.
    2.  While the queue is not empty:
        * Get the current level's size.
        * Loop that many times to process all nodes on the current level.
        * `dequeue` a node, process it, and `enqueue` its children.
* **Code Snippet (Tree Level Order)**:
    ```javascript
    function levelOrder(root) {
      if (!root) return [];
      const queue = [root];
      const result = [];
      while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        for (let i = 0; i < levelSize; i++) {
          const node = queue.shift();
          currentLevel.push(node.val);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
        result.push(currentLevel);
      }
      return result;
    }
    ```

#### ### 2. Number of Recent Calls (Sliding Time Window)

* **Problem**: Count requests that have occurred in the last 3000 milliseconds.
* **Key Pattern**: A queue is excellent for maintaining a list of events within a moving time window.
* **Approach**:
    1.  When a new request (`ping`) arrives at time `t`, `enqueue` its timestamp.
    2.  `dequeue` all timestamps from the front of the queue that are older than `t - 3000`.
    3.  The size of the queue is the answer.
* **Code Snippet**:
    ```javascript
    class RecentCounter {
      constructor() {
        this.queue = [];
      }
      ping(t) {
        this.queue.push(t);
        while (this.queue[0] < t - 3000) {
          this.queue.shift();
        }
        return this.queue.length;
      }
    }
    ```

#### ### 3. Implement Queue using Stacks

* **Problem**: Implement a FIFO queue using only two LIFO stacks.
* **Key Pattern**: This is a classic conceptual problem. Use one stack for `enqueue` operations and another for `dequeue` operations, transferring elements as needed.
* **Approach**:
    1.  Use two stacks: `input` and `output`.
    2.  **Enqueue**: Always `push` to the `input` stack.
    3.  **Dequeue**: If the `output` stack is empty, transfer all elements from `input` to `output`. This reverses their order. Then, `pop` from `output`.
* **Code Snippet**:
    ```javascript
    class MyQueue {
      constructor() {
        this.inputStack = [];
        this.outputStack = [];
      }
      enqueue(x) {
        this.inputStack.push(x);
      }
      dequeue() {
        if (this.outputStack.length === 0) {
          while (this.inputStack.length > 0) {
            this.outputStack.push(this.inputStack.pop());
          }
        }
        return this.outputStack.pop();
      }
    }
    ```
