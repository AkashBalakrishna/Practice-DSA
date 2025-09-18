### Algorithm Complexity Analysis Cheatsheet 🚀

Understanding the trade-offs between algorithms is crucial in coding interviews. This guide compares the time and space complexities for common algorithms, illustrating the path from a brute-force approach to an optimized one.

---

### Sorting Algorithms SORT

Sorting is a fundamental operation. While brute-force methods like Bubble Sort are easy to conceptualize, they are inefficient. Optimized algorithms like Merge Sort and Quick Sort are standard in practice.

| Algorithm | Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity (Worst) | Notes |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **Brute-force**. Simple but highly inefficient. Rarely used. |
| **Insertion Sort**| $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Efficient for small or nearly sorted datasets. |
| **Selection Sort**| $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Simple, but inefficient due to many comparisons. |
| **Merge Sort** | $O(n \log n)$| $O(n \log n)$| $O(n \log n)$| $O(n)$ | **Optimized**. Stable and reliable performance. Uses extra space. |
| **Quick Sort** | $O(n \log n)$| $O(n \log n)$| $O(n^2)$ | $O(\log n)$ | **Optimized**. Very fast on average. Worst case is rare but possible. |
| **Heap Sort** | $O(n \log n)$| $O(n \log n)$| $O(n \log n)$| $O(1)$ | **Optimized**. In-place sort with reliable performance. |



---

### Searching Algorithms 🔍

Searching for an element is a common task. The choice of algorithm depends entirely on whether the data is sorted.

| Algorithm | Data Structure | Time Complexity (Average) | Space Complexity (Worst) | Notes |
| :--- | :--- | :---: | :---: | :--- |
| **Linear Search** | Unsorted Array | $O(n)$ | $O(1)$ | **Brute-force**. Scans the entire list. The only option for unsorted data. |
| **Binary Search** | Sorted Array | $O(\log n)$ | $O(1)$ | **Optimized**. Extremely efficient. Requires the data to be sorted first. |
| **Hash Table Lookup**| Hash Table (Map/Set) | $O(1)$ | $O(n)$ | **Highly Optimized**. Near-instantaneous lookups on average. |

---

### Common Data Structure Operations ⚙️

Choosing the right data structure can drastically change your algorithm's performance. The trade-offs are most apparent in the time it takes to add, remove, or find data.

| Data Structure | Operation: Access | Operation: Search | Operation: Insertion | Operation: Deletion | Notes |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Array** | $O(1)$ | $O(n)$ | $O(n)$* | $O(n)$* | Fast access by index, but slow insertion/deletion in the middle. |
| **Linked List** | $O(n)$ | $O(n)$ | $O(1)$** | $O(1)$** | Fast insertion/deletion at ends, but slow access/search. |
| **Hash Table (Map/Set)** | N/A | $O(1)$ | $O(1)$ | $O(1)$ | **Optimized**. The go-to for fast lookups, insertions, and deletions. |
| **Balanced BST*** | $O(\log n)$| $O(\log n)$| $O(\log n)$| $O(\log n)$| Good all-around performance. Keeps data sorted. |

\* *For arrays, insertion/deletion at the end (`push`/`pop`) is $O(1)$.*
\** *For linked lists, insertion/deletion is $O(1)$ if you have a direct reference to the node.*
\*** *BST = Binary Search Tree. Unbalanced BSTs can degrade to $O(n)$ in the worst case.*

---

### Graph Traversal Algorithms 🗺️

Graph traversal complexities depend on the number of vertices ($V$) and edges ($E$).

| Algorithm | Data Structure | Time Complexity | Space Complexity (Worst) | Notes |
| :--- | :--- | :---: | :---: | :--- |
| **BFS** | Adjacency List | $O(V + E)$ | $O(V)$ | Finds the shortest path in an unweighted graph. Uses a queue. |
| **DFS** | Adjacency List | $O(V + E)$ | $O(V)$ | Can be more space-efficient (if using recursion) and is great for pathfinding. |
| **BFS** | Adjacency Matrix| $O(V^2)$ | $O(V)$ | Less efficient if the graph is sparse. |
| **DFS** | Adjacency Matrix| $O(V^2)$ | $O(V)$ | Less efficient if the graph is sparse. |
