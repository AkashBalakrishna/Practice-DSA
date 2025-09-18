### Tree Traversals Cheatsheet & Must-Know Questions 🌳

This guide provides a concise overview of tree traversal algorithms, their complexities, and detailed solutions to key interview questions that test these patterns.

---

### ## Tree Traversal Cheatsheet

#### ### 1. Depth-First Search (DFS) - *Recursive*

* **In-order (Left, Root, Right)**: Visits nodes of a BST in **sorted order**.
    ```javascript
    function inorder(node, result = []) {
      if (!node) return;
      inorder(node.left, result);
      result.push(node.val);
      inorder(node.right, result);
    }
    ```
* **Pre-order (Root, Left, Right)**: Useful for **copying a tree**.
    ```javascript
    function preorder(node, result = []) {
      if (!node) return;
      result.push(node.val);
      preorder(node.left, result);
      preorder(node.right, result);
    }
    ```
* **Post-order (Left, Right, Root)**: Process children **before** the parent (e.g., for deletion or calculation).
    ```javascript
    function postorder(node, result = []) {
      if (!node) return;
      postorder(node.left, result);
      postorder(node.right, result);
      result.push(node.val);
    }
    ```

#### ### 2. Breadth-First Search (BFS) - *Iterative with Queue*

* **Level Order**: Explores level by level. Finds the **shortest path** in unweighted trees.
    ```javascript
    function levelOrder(root) {
      if (!root) return;
      const queue = [root];
      while (queue.length > 0) {
        const node = queue.shift();
        console.log(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
    ```

---

### ## Complexity Analysis

For a tree with `n` nodes:

| Traversal | Time Complexity | Space Complexity (Worst) | Notes |
| :--- | :---: | :---: | :--- |
| **DFS (All types)** | $O(n)$ | $O(n)$ | Space is the height of the tree ($O(\log n)$ for balanced, $O(n)$ for skewed). |
| **BFS (Level Order)**| $O(n)$ | $O(n)$ | Space is the max width of the tree, which can be up to $n/2$. |

---

### ## Must-Know Questions & Code Solutions

#### ### 1. Binary Tree Level Order Traversal

* **Problem**: Given a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).
* **Traversal Pattern**: **BFS**. This is the definition of BFS.
* **Approach**: Use a queue. In a loop, process all nodes currently in the queue (which constitute one level). For each node you process, add its children to the queue for the next level.
* **Code**:
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

#### ### 2. Maximum Depth of Binary Tree

* **Problem**: Find the maximum depth (or height) of a binary tree.
* **Traversal Pattern**: **Post-order DFS**.
* **Approach**: The depth of a tree is `1 + max(depth of left subtree, depth of right subtree)`. This naturally lends itself to a post-order recursive solution where we find the results for children before calculating the result for the parent.
* **Code**:
    ```javascript
    function maxDepth(root) {
      if (!root) {
        return 0; // Base case: an empty tree has a depth of 0
      }
      const leftDepth = maxDepth(root.left);
      const rightDepth = maxDepth(root.right);
      return Math.max(leftDepth, rightDepth) + 1;
    }
    ```

#### ### 3. Validate Binary Search Tree

* **Problem**: Determine if a given binary tree is a valid Binary Search Tree (BST).
* **Traversal Pattern**: **Recursive DFS (passing constraints down)**.
* **Approach**: A simple check `node.left < node < node.right` is not enough. All nodes in the left subtree must be smaller, and all in the right must be larger. We do this by passing a valid `[min, max]` range down the recursion.
* **Code**:
    ```javascript
    function isValidBST(root) {
      function validate(node, min, max) {
        if (!node) return true; // Empty nodes are valid
        if (node.val <= min || node.val >= max) {
          return false; // Node's value is outside the valid range
        }
        // The left child's max is the parent's value.
        // The right child's min is the parent's value.
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
      }
      return validate(root, -Infinity, Infinity);
    }
    ```

#### ### 4. Lowest Common Ancestor (LCA) of a Binary Tree

* **Problem**: Find the lowest node in a tree that has two given nodes as descendants.
* **Traversal Pattern**: **Post-order DFS**.
* **Approach**: A recursive function searches for the target nodes (`p`, `q`). If the current node is `p` or `q`, it returns itself. A parent node is the LCA if its left and right recursive calls both return a valid node. Otherwise, it propagates the valid node it found up the call stack.
* **Code**:
    ```javascript
    function lowestCommonAncestor(root, p, q) {
      if (!root || root === p || root === q) {
        return root; // Base case: found p, q, or hit the end
      }
      const leftFound = lowestCommonAncestor(root.left, p, q);
      const rightFound = lowestCommonAncestor(root.right, p, q);

      if (leftFound && rightFound) {
        return root; // This node is the LCA
      }
      // If only one side found a node, propagate it up
      return leftFound || rightFound;
    }
    ```
#### ### 5. Binary Tree Right Side View

* **Problem**: Return the values of the nodes you can see ordered from top to bottom when looking at a binary tree from the right side.
* **Traversal Pattern**: **BFS**.
* **Approach**: Perform a standard level-order traversal (BFS). For each level, the **last node** you process is the rightmost one. Add this node's value to your result list.
* **Code**:
    ```javascript
    function rightSideView(root) {
        if (!root) return [];
        const queue = [root];
        const result = [];
        while(queue.length > 0) {
            const levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                // If it's the last node on this level, add it to the result
                if (i === levelSize - 1) {
                    result.push(node.val);
                }
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
        }
        return result;
    }
    ```
