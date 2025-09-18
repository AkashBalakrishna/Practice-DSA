### Heaps (Priority Queues): Interview Cheatsheet & Patterns 🏔️

Heaps are a crucial tree-based data structure, perfect for problems involving priority, ordering, and finding the "Top K" elements.

---

### ## The Cheatsheet

A **Heap** is a specialized tree-based data structure that satisfies the heap property. It's typically implemented as an array.

* **Core Idea**: It's a partially sorted data structure. It doesn't sort the entire collection, but it always keeps the highest (or lowest) priority element at the top, making it very fast to access.
* **Types**:
    * **Min-Heap**: The parent node is always smaller than or equal to its children. The root is the **smallest** element.
    * **Max-Heap**: The parent node is always larger than or equal to its children. The root is the **largest** element.

* **Key Properties**:
    * It is a **complete binary tree**, meaning all levels are fully filled except possibly the last, which is filled from left to right.
    * This structure allows it to be efficiently stored in an array.

* **Core Operations & Complexity**:
| Operation | Description | Time Complexity |
| :--- | :--- | :---: |
| **`insert` / `add`** | Add a new element to the heap. | $O(\log n)$ |
| **`extractMin` / `extractMax`** | Remove and return the root element. | $O(\log n)$ |
| **`peek`** | View the root element without removing it. | $O(1)$ |

* **JavaScript Implementation Note**:
JavaScript **does not have a built-in Heap/Priority Queue**. In an interview, you can either:
1.  Use a pre-built library if allowed (e.g., from LeetCode's environment).
2.  Implement a basic version yourself using an array and `siftUp`/`siftDown` helper functions.
3.  **Most commonly**, you can describe the logic assuming you have a `MinPriorityQueue` or `MaxPriorityQueue` class available.

---

### ## Must-Know Heap Problem Patterns

Heaps excel at problems where you repeatedly need to access the smallest or largest item from a dynamic collection.

#### ### 1. Top 'K' Elements

This is the most common and important heap pattern.

* **Problem**: Find the Kth largest/smallest element, top K frequent elements, or K closest points to the origin.
* **Key Pattern**: Use a **Min-Heap** of size `K` to track the `K` largest elements seen so far.
* **Approach (Kth Largest Element)**:
    1.  Create a **Min-Heap**.
    2.  Iterate through the input array `nums`.
    3.  For each `num`, push it into the heap.
    4.  If the heap's size grows larger than `K`, `extract` the minimum element. This ensures the heap only holds the `K` largest elements encountered.
    5.  After the loop, the root of the heap (`peek()`) is the Kth largest element.
* **Code Snippet (Kth Largest Element)**:
    ```javascript
    // Assuming a MinPriorityQueue class is available
    function findKthLargest(nums, k) {
      const minHeap = new MinPriorityQueue();
      for (const num of nums) {
        minHeap.enqueue(num);
        if (minHeap.size() > k) {
          minHeap.dequeue();
        }
      }
      return minHeap.front().element;
    }
    ```

#### ### 2. Two Heaps for Median Finding

* **Problem**: Find the median from a continuous data stream.
* **Key Pattern**: Use **two heaps** to partition a stream of numbers into two halves: a **Max-Heap** for the smaller half and a **Min-Heap** for the larger half.
* **Approach**:
    1.  The **Max-Heap** stores numbers less than or equal to the median.
    2.  The **Min-Heap** stores numbers greater than or equal to the median.
    3.  Keep the heaps balanced in size (the max-heap can have at most one more element).
    4.  **To find the median**: If the heaps have an unequal number of elements, the median is the root of the max-heap. If they are equal, it's the average of the two roots.
* **Code Snippet (Median Finder)**:
    ```javascript
    class MedianFinder {
      constructor() {
        this.smallHalf = new MaxPriorityQueue(); // Max-Heap
        this.largeHalf = new MinPriorityQueue(); // Min-Heap
      }
      addNum(num) {
        this.smallHalf.enqueue(num);
        // Ensure every element in smallHalf is <= every element in largeHalf
        if (this.smallHalf.size() > 0 && this.largeHalf.size() > 0 && this.smallHalf.front().element > this.largeHalf.front().element) {
          this.largeHalf.enqueue(this.smallHalf.dequeue().element);
        }
        // Balance the heaps
        if (this.smallHalf.size() > this.largeHalf.size() + 1) {
          this.largeHalf.enqueue(this.smallHalf.dequeue().element);
        }
        if (this.largeHalf.size() > this.smallHalf.size()) {
          this.smallHalf.enqueue(this.largeHalf.dequeue().element);
        }
      }
      findMedian() {
        if (this.smallHalf.size() > this.largeHalf.size()) {
          return this.smallHalf.front().element;
        }
        return (this.smallHalf.front().element + this.largeHalf.front().element) / 2;
      }
    }
    ```

#### ### 3. K-way Merge

* **Problem**: Merge `K` sorted lists into a single sorted list.
* **Key Pattern**: Use a **Min-Heap** to efficiently find the overall minimum element among the current heads of all `K` lists.
* **Approach**:
    1.  Create a **Min-Heap** to store `[value, listIndex, elementIndex]`.
    2.  Initialize the heap with the first element from each of the `K` lists.
    3.  While the heap is not empty:
        * `extract` the minimum element. Add its `value` to the result list.
        * If the list from which the element came has more elements, add the next element from that list back into the heap.
* **Code Snippet (Merge K Sorted Lists)**:
    ```javascript
    // Assuming a MinPriorityQueue that can take a custom comparator
    function mergeKLists(lists) {
      const minHeap = new MinPriorityQueue({ compare: (a, b) => a.val - b.val });
      
      // Seed the heap with the head of each list
      for (const head of lists) {
        if (head) minHeap.enqueue(head);
      }

      let dummyHead = new ListNode(0);
      let tail = dummyHead;

      while (minHeap.size() > 0) {
        const smallestNode = minHeap.dequeue();
        tail.next = smallestNode;
        tail = tail.next;
        if (smallestNode.next) {
          minHeap.enqueue(smallestNode.next);
        }
      }
      return dummyHead.next;
    }
    ```

#### ### 4. Greedy Approach / Scheduling

* **Problem**: Find the minimum number of resources needed for a set of events (e.g., meeting rooms).
* **Key Pattern**: Use a **Min-Heap** to keep track of the "end times" of events. The root of the heap always tells you the earliest available resource.
* **Approach (Meeting Rooms II)**:
    1.  Sort the meetings by their **start time**.
    2.  Initialize a **Min-Heap** to store the end times of meetings currently in progress.
    3.  Iterate through the sorted meetings:
        * If the current meeting's start time is after or at the same time as the earliest end time in the heap (`heap.peek()`), it means a room has become free. `extract` the old end time.
        * Add the current meeting's end time to the heap.
    4.  The maximum size the heap ever reached is the minimum number of rooms required.
* **Code Snippet (Meeting Rooms II)**:
    ```javascript
    function minMeetingRooms(intervals) {
      if (!intervals.length) return 0;
      intervals.sort((a, b) => a[0] - b[0]); // Sort by start time

      const minHeap = new MinPriorityQueue(); // Stores end times
      minHeap.enqueue(intervals[0][1]);

      for (let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i];
        if (start >= minHeap.front().element) {
          // A room is free
          minHeap.dequeue();
        }
        minHeap.enqueue(end);
      }
      return minHeap.size();
    }
    ```
