### Graphs: Interview Cheatsheet & Must-Know Problems 🕸️

This guide covers the essential patterns, representations, and algorithms for solving graph-based problems in coding interviews.

---

### ## The Cheatsheet

#### ### 1. Graph Representation

How you store the graph is the first critical decision.

* **Adjacency List (Most Common)**
    * **What it is**: A map or array where the key/index represents a node and the value is a list of its neighbors.
    * **When to use**: The default choice, especially for **sparse graphs** (few edges).
    * **Space Complexity**: $O(V + E)$
    * **JS Template**:
        ```javascript
        const edges = [[0, 1], [1, 2], [2, 0]];
        const adjList = new Map();
        // Or: const adjList = Array.from({ length: numNodes }, () => []);
        
        for (const [u, v] of edges) {
          if (!adjList.has(u)) adjList.set(u, []);
          if (!adjList.has(v)) adjList.set(v, []);
          adjList.get(u).push(v);
          // For an undirected graph, add the reverse edge:
          // adjList.get(v).push(u);
        }
        ```

* **Adjacency Matrix**
    * **What it is**: A 2D grid where `matrix[i][j] = 1` if an edge exists from node `i` to `j`.
    * **When to use**: For **dense graphs** (many edges) or when you need to check for an edge between two nodes in $O(1)$ time.
    * **Space Complexity**: $O(V^2)$

#### ### 2. Core Traversal Algorithms

These are the fundamental ways to explore a graph.

* **Breadth-First Search (BFS)**
    * **Analogy**: Spreading out in waves from a starting point.
    * **Data Structure**: **Queue** (FIFO).
    * **Use Case**: Finding the **shortest path** in an **unweighted** graph.
    * **Template**:
        ```javascript
        function bfs(graph, startNode) {
          const queue = [startNode];
          const visited = new Set([startNode]);
          while (queue.length > 0) {
            const node = queue.shift();
            // Process node
            for (const neighbor of graph.get(node)) {
              if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
              }
            }
          }
        }
        ```

* **Depth-First Search (DFS)**
    * **Analogy**: Going as deep down one path as possible before backtracking.
    * **Data Structure**: **Recursion** (implicit stack) or an explicit stack.
    * **Use Case**: Pathfinding, detecting cycles, exploring all possibilities (e.g., maze solving).
    * **Template (Recursive)**:
        ```javascript
        function dfs(graph, startNode, visited = new Set()) {
          visited.add(startNode);
          // Process node
          for (const neighbor of graph.get(startNode)) {
            if (!visited.has(neighbor)) {
              dfs(graph, neighbor, visited);
            }
          }
        }
        ```

---

### ## Must-Know Problems & Patterns

#### ### 1. Number of Islands (Grid Traversal)

* **Problem**: Given a 2D grid of '1's (land) and '0's (water), count the number of islands.
* **Key Pattern**: **Grid Traversal (BFS or DFS)**. Iterate through each cell. If you find a '1', start a traversal to find all connected land parts, "sinking" them (marking as visited) along the way. Each new traversal you start is a new island.
* **Code (BFS)**:
    ```javascript
    function numIslands(grid) {
      if (!grid.length) return 0;
      let islandCount = 0;
      const rows = grid.length, cols = grid[0].length;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] === '1') {
            islandCount++;
            const queue = [[r, c]];
            grid[r][c] = '0'; // Mark visited
            while (queue.length > 0) {
              const [row, col] = queue.shift();
              const directions = [[1,0], [-1,0], [0,1], [0,-1]];
              for (const [dr, dc] of directions) {
                const newRow = row + dr, newCol = col + dc;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === '1') {
                  queue.push([newRow, newCol]);
                  grid[newRow][newCol] = '0';
                }
              }
            }
          }
        }
      }
      return islandCount;
    }
    ```

#### ### 2. Clone Graph

* **Problem**: Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph.
* **Key Pattern**: **DFS + Hash Map**. Traversal (DFS or BFS) is needed to visit every node. A hash map is crucial to store the mapping from an original node to its cloned copy. This map prevents you from re-cloning nodes and getting stuck in infinite loops in a cyclic graph.
* **Approach**:
    1.  Use a hash map `visited` to store `(originalNode -> clonedNode)`.
    2.  Start a recursive DFS from the given `node`.
    3.  In the DFS function, if the node is already in `visited`, return its clone.
    4.  Otherwise, create a `new Node(node.val)` and store it in `visited`.
    5.  Iterate through the `node`'s neighbors. For each neighbor, make a recursive call to `dfs(neighbor)` and push the result onto the cloned node's neighbors list.
    6.  Return the cloned node.
* **Code (DFS)**:
    ```javascript
    function cloneGraph(node) {
      const visited = new Map();
      function dfs(originalNode) {
        if (!originalNode) return null;
        if (visited.has(originalNode)) return visited.get(originalNode);

        const cloneNode = new Node(originalNode.val, []);
        visited.set(originalNode, cloneNode);

        for (const neighbor of originalNode.neighbors) {
          cloneNode.neighbors.push(dfs(neighbor));
        }
        return cloneNode;
      }
      return dfs(node);
    }
    ```

#### ### 3. Course Schedule (Topological Sort)

* **Problem**: Given `numCourses` and a list of `prerequisites`, determine if it's possible to finish all courses.
* **Key Pattern**: **Topological Sort**. The problem is asking if the dependency graph contains a cycle.
* **Approach (Kahn's Algorithm)**: Use a queue and track the "in-degree" of each node. Start with nodes that have an in-degree of 0. As you process nodes, decrement the in-degree of their neighbors. If a neighbor's in-degree becomes 0, add it to the queue. A solution is possible if you process all nodes.
* **Code**:
    ```javascript
    function canFinish(numCourses, prerequisites) {
      const adjList = new Map();
      const inDegree = new Array(numCourses).fill(0);
      for (let i = 0; i < numCourses; i++) adjList.set(i, []);

      for (const [course, prereq] of prerequisites) {
        adjList.get(prereq).push(course);
        inDegree[course]++;
      }

      const queue = [];
      for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
      }

      let count = 0;
      while (queue.length > 0) {
        const course = queue.shift();
        count++;
        for (const neighbor of adjList.get(course)) {
          inDegree[neighbor]--;
          if (inDegree[neighbor] === 0) queue.push(neighbor);
        }
      }
      return count === numCourses;
    }
    ```

#### ### 4. Network Delay Time (Dijkstra's Algorithm)

* **Problem**: Find the minimum time it takes for a signal from a source node `k` to reach **all** other nodes in a weighted network.
* **Key Pattern**: **Single-Source Shortest Path (Dijkstra's Algorithm)** on a weighted graph with non-negative weights.
* **Approach**: Use a **Min-Priority Queue** to always explore the node that is currently reachable in the shortest amount of time. Maintain a `distances` array. When you find a shorter path to a neighbor, update its distance and add it to the priority queue.
* **Code**:
    ```javascript
    // Assumes a MinPriorityQueue class is available
    function networkDelayTime(times, n, k) {
      const adj = new Map();
      for (let i = 1; i <= n; i++) adj.set(i, []);
      for (const [u, v, w] of times) {
        adj.get(u).push({ node: v, weight: w });
      }

      const distances = new Array(n + 1).fill(Infinity);
      distances[k] = 0;

      const pq = new MinPriorityQueue({ priority: x => x.distance });
      pq.enqueue({ node: k, distance: 0 });

      while (!pq.isEmpty()) {
        const { node, distance } = pq.dequeue().element;
        if (distance > distances[node]) continue;

        for (const { node: neighbor, weight } of adj.get(node) || []) {
          const newDist = distance + weight;
          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist;
            pq.enqueue({ node: neighbor, distance: newDist });
          }
        }
      }
      const maxDist = Math.max(...distances.slice(1));
      return maxDist === Infinity ? -1 : maxDist;
    }
    ```

#### ### 5. Redundant Connection (Union-Find)

* **Problem**: Given a list of edges that form a tree with one additional edge, find the redundant edge that creates a cycle.
* **Key Pattern**: **Union-Find (Disjoint Set Union)**. This data structure is highly efficient for detecting cycles.
* **Approach**:
    1.  Initialize a Union-Find structure for `n` nodes.
    2.  Iterate through each `edge [u, v]`.
    3.  For each edge, attempt to `union` the two nodes. The `union` operation returns `false` if the two nodes are already in the same set (i.e., connected).
    4.  The first edge for which `union` returns `false` is the redundant edge that forms the cycle.
* **Code**:
    ```javascript
    function findRedundantConnection(edges) {
      const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
      const find = (i) => {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
      };
      const union = (i, j) => {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) {
          parent[rootI] = rootJ;
          return true;
        }
        return false;
      };

      for (const [u, v] of edges) {
        if (!union(u, v)) {
          return [u, v];
        }
      }
    }
    ```
