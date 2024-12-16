/**
 * 图的邻接矩阵实现
 * 顶点和边的类型分别为 Tv 和 Te
 */

// 顶点状态常量
const VStatus = Object.freeze({
  UNDISCOVERED: 0, // 未发现
  DISCOVERED: 1, // 已发现
  VISITED: 2, // 已访问
});

// 边类型常量
const EType = Object.freeze({
  UNDETERMINED: 0, // 未确定
  TREE: 1, // 树边
  CROSS: 2, // 交叉边
  FORWARD: 3, // 前向边
  BACKWARD: 4, // 后向边
});

// 顶点类
class Vertex {
  constructor(data = null) {
    this.data = data; // 顶点数据
    this.inDegree = 0; // 入度
    this.outDegree = 0; // 出度
    this.status = VStatus.UNDISCOVERED; // 状态
    this.dTime = -1; // 发现时间戳
    this.fTime = -1; // 访问完成时间戳
    this.parent = -1; // 在遍历树中的父节点
    this.priority = Number.MAX_SAFE_INTEGER; // 优先级
  }
}

// 边类
class Edge {
  constructor(data, weight) {
    this.data = data; // 边数据
    this.weight = weight; // 边权重
    this.type = EType.UNDETERMINED; // 边类型
  }
}

// 基于邻接矩阵的图实现
class GraphMatrix {
  constructor() {
    this.V = []; // 顶点集合（数
    this.E = []; // 边集合（邻接矩阵，二维数组）
    this.n = 0; // 顶点数
    this.e = 0; // 边数
  }
  /**
   * 获取顶点v的第一个邻接顶点
   * @param {number} v 顶点v的编号
   * @returns {number} 顶点u的编号
   */
  firstNbr(v) {
    return this.nextNbr(v, this.n);
  }
  /**
   * 获取顶点v相对于顶点u的下一邻接顶点
   * @param {number} v 顶点v的编号
   * @param {number} u 顶点u的编号
   * @returns {number} 顶点u的编号
   */
  nextNbr(v, u) {
    while (-1 !== --u && !this.exists(v, u));
    return u;
  }
  /**
   * 插入顶点，返回顶点编号
   * @param {*} data 顶点数据
   * @returns {number} 顶点编号
   */
  insertVertex(data) {
    // 为现有顶点的边数组扩展一列
    for (let u = 0; u < this.n; u++) {
      this.E[u].push(null);
    }

    // 创建新顶点对应的边数组（长度为n+1）
    const newEdgeArray = Array(this.n + 1).fill(null);
    this.E.push(newEdgeArray);

    // 创建并添加新的顶点对象
    const newVertex = new Vertex(data);
    this.V.push(newVertex);

    this.n++; // 更新顶点数
    return this.n - 1; // 返回新顶点的编号
  }

  /**
   * 删除第v个顶点及其关联边（0 <= v < n）
   * @param {number} v 顶点v的编号
   * @returns {*} 被删除的顶点数据
   */
  removeVertex(v) {
    // 检查参数有效性
    if (v < 0 || v >= this.n || !this.V[v]) {
      throw new Error("无效的顶点索引");
    }

    const data = this.V[v].data; // 备份顶点数据

    // 删除所有与顶点v关联的边
    for (let u = 0; u < this.n; u++) {
      if (this.exists(v, u)) {
        this.removeEdge(v, u);
      }
      if (this.exists(u, v)) {
        this.removeEdge(u, v);
      }
    }

    // 删除第v行
    this.E.splice(v, 1);

    // 删除其他顶点的边数组中的第v列
    for (let u = 0; u < this.n - 1; u++) {
      this.E[u].splice(v, 1);
    }

    this.V.splice(v, 1); // 删除顶点v
    this.n--; // 更新顶点数
    return data; // 返回被删除顶点的数据
  }

  /**
   * 判断两个顶点之间是否存在边
   * @param {number} v 顶点v的编号
   * @param {number} u 顶点u的编号
   * @returns {boolean} 如果存在边则返回true，否则返回false
   */
  exists(v, u) {
    return this.E[v][u] != null;
  }
  /**
   * 获取顶点v和u之间的边类型
   * @param {number} v 顶点v的编号
   * @param {number} u 顶点u的编号
   * @returns {number} 边类型
   */
  type(v, u) {
    return this.E[v][u].type;
  }
  /**
   * 获取顶点v和u之间的边数据
   * @param {number} v 顶点v的编号
   * @param {number} u 顶点u的编号
   * @returns {*} 边数据
   */
  edge(v, u) {
    return this.E[v][u].data;
  }
  /**
   * 获取顶点v和u之间的边权重
   * @param {number} v 顶点v的编号
   * @param {number} u 顶点u的编号
   * @returns {number} 边权重
   */
  weight(v, u) {
    return this.E[v][u].weight;
  }
  /**
   * 插入权重为w的边(v, u)
   * @param {*} edge 边数据
   * @param {number} w 边权重
   * @param {number} from 顶点v的编号
   * @param {number} to 顶点u的编号
   */
  insertEdge(edge, w, from, to) {
    if (this.exists(from, to)) return; // 确保该边尚不存在
    this.E[from][to] = new Edge(edge, w); // 创建新边
    this.V[from].outDegree++; // 更新顶点v的出度
    this.V[to].inDegree++; // 更新顶点u的入度
    this.e++; // 更新边计数
  }
  /**
   * 删除顶点v和u之间的边
   * @param {number} from 顶点v的编号
   * @param {number} to 顶点u的编号
   * @returns {*} 被删除的边数据
   */
  removeEdge(from, to) {
    const edge = this.E[from][to].data; // 备份边数据
    this.E[v][u] = null; // 删除边记录
    this.e--; // 更新边计数
    this.V[v].outDegree--; // 更新顶点v的出度
    this.V[u].inDegree--; // 更新顶点u的入度

    return edge;
  }

  /**
   * 重置所有顶点和边的辅助信息
   */
  reset() {
    for (let v = 0; v < this.n; v++) {
      this.V[v].status = VStatus.UNDISCOVERED;
      this.V[v].dTime = -1;
      this.V[v].fTime = -1;
      this.V[v].parent = -1;
      this.V[v].priority = Number.MAX_SAFE_INTEGER;
      for (let u = 0; u < this.n; u++) {
        if (this.exists(v, u)) {
          this.E[v][u].type = EType.UNDETERMINED;
        }
      }
    }
  }

  /**
   * 广度优先搜索BFS算法(单个连通域)
   * @param {number} v 起始顶点编号
   * @param {object} clock 时间戳对象 { value: number }
   */
  BFS(v, clock) {
    // 创建队列
    const Q = [];

    // 起点入队
    this.V[v].status = VStatus.DISCOVERED;
    Q.push(v);

    while (Q.length) {
      const v = Q.shift(); // 取出队首顶点
      this.V[v].dTime = ++clock.value;
      for (let u = this.firstNbr(v); u !== -1; u = this.nextNbr(v, u)) {
        if (this.V[u].status === VStatus.UNDISCOVERED) {
          // 若u尚未被发现,则
          this.V[u].status = VStatus.DISCOVERED; // 发现该顶点
          Q.push(u); // 该顶点入队
          this.E[v][u].type = EType.TREE; // 引入树边
          this.V[u].parent = v; // 更新父节点
        } else {
          // 若u已被发现,或者已访问完毕
          this.E[v][u].type = EType.CROSS; // 将(v,u)统一归类于跨边
        }
      }
      this.V[v].fTime = clock.value;
      this.V[v].status = VStatus.VISITED; // 访问完毕
    }
  }
  /**
   * 广度优先搜索BFS算法(全图)
   * @param {number} s 起始顶点编号
   */
  bfs(s) {
    this.reset(); // 全图复位
    const clock = { value: 0 }; // 计数器改为对象形式

    // 从s起顺次检查所有顶点
    for (let v = s; v < s + this.n; v++) {
      const i = v % this.n;
      if (this.V[i].status === VStatus.UNDISCOVERED) {
        // 若该顶点尚未被发现
        this.BFS(i, clock); // 从该顶点启动一次BFS
      }
    }
  }
  /**
   * 深度优先搜索
   * @param {number} v 起始顶点编号
   */
  DFS(v, clock) {
    this.V[v].status = VStatus.DISCOVERED;
    this.V[v].dTime = ++clock.value;
    // 考查v的每一个邻居u
    for (let u = this.firstNbr(v); u !== -1; u = this.nextNbr(v, u)) {
      switch (this.V[u].status) {
        case VStatus.UNDISCOVERED: // u尚未发现，意味着支撑树可在此拓展
          this.E[v][u].type = EType.TREE;
          this.V[u].parent = v;
          this.DFS(u, clock);
          break;
        case VStatus.DISCOVERED: // u已被发现但尚未访问完毕，应属被后代指向的祖先
          this.E[v][u].type = EType.BACKWARD;
          break;
        default: // u已访问完毕（VISITED，有向图），则视承袭关系分为前向边或跨边
          this.E[v][u].type = this.V[v].dTime < this.V[u].dTime ? EType.FORWARD : EType.CROSS;
          break;
      }
    }
    // 至此，当前顶点v方告访问完毕
    this.V[v].status = VStatus.VISITED;
    this.V[v].fTime = ++clock.value;
    return clock;
  }
  /**
   * 深度优先搜索
   * @param {number} s 起始顶点编号
   */
  dfs(s) {
    this.reset();
    let clock = { value: 0 };
    for (let v = s; v < s + this.n; v++) {
      const i = v % this.n;
      if (this.V[i].status === VStatus.UNDISCOVERED) {
        this.DFS(i, clock);
      }
    }
  }
  /**
   * 最小生成树的Prim算法实现
   * @param {number} s 起始顶点编号
   */
  prim(s) {
    // 全图复位
    this.reset();
    // 起始顶点优先级设为0
    this.V[s].priority = 0;

    // 需要引入n个顶点和n-1条边
    for (let i = 0; i < this.n; i++) {
      // 当前顶点标记为已访问
      this.V[s].status = VStatus.VISITED;

      // 如果当前顶点有父节点,则将对应边标记为树边
      if (this.V[s].parent !== -1) {
        this.E[this.V[s].parent][s].type = EType.TREE;
      }

      // 枚举s的所有邻居j
      for (let j = this.firstNbr(s); j !== -1; j = this.nextNbr(s, j)) {
        // 对未发现的邻接顶点j做松弛
        if (this.V[j].status === VStatus.UNDISCOVERED && this.V[j].priority > this.E[s][j].weight) {
          // 更新优先级为边的权重
          this.V[j].priority = this.E[s][j].weight;
          // 更新父节点
          this.V[j].parent = s;
        }
      }

      // 选出下一个最小权重的顶点
      let shortest = Number.MAX_SAFE_INTEGER;
      for (let j = 0; j < this.n; j++) {
        if (this.V[j].status === VStatus.UNDISCOVERED && shortest > this.V[j].priority) {
          shortest = this.V[j].priority;
          s = j;
        }
      }
    }
  }
  /**
   * 最短路径Dijkstra算法
   * @param {number} s 起始顶点编号
   */
  dijkstra(s) {
    // 全图复位
    this.reset();
    // 起始顶点优先级设为0
    this.V[s].priority = 0;

    // 需要引入n个顶点和n-1条边
    for (let i = 0; i < this.n; i++) {
      // 当前顶点标记为已访问
      this.V[s].status = VStatus.VISITED;

      // 如果当前顶点有父节点,则将对应边标记为树边
      if (this.V[s].parent !== -1) {
        this.E[this.V[s].parent][s].type = EType.TREE;
      }

      // 枚举s的所有邻居j
      for (let j = this.firstNbr(s); j !== -1; j = this.nextNbr(s, j)) {
        // 对未发现的邻接顶点j做松弛
        if (this.V[j].status === VStatus.UNDISCOVERED && this.V[j].priority > this.V[s].priority + this.E[s][j].weight) {
          // 更新优先级为当前路径长度
          this.V[j].priority = this.V[s].priority + this.E[s][j].weight; // 与Prim算法唯一的不同之处
          // 更新父节点
          this.V[j].parent = s;
        }
      }

      // 选出下一个最短路径顶点
      let shortest = Number.MAX_SAFE_INTEGER;
      for (let j = 0; j < this.n; j++) {
        if (this.V[j].status === VStatus.UNDISCOVERED && shortest > this.V[j].priority) {
          shortest = this.V[j].priority;
          s = j;
        }
      }
    }
  }
  /**
   * 优先级搜索算法(全图)
   * @param {number} s 起始顶点编号
   * @param {Function} prioUpdater 优先级更新器
   */
  pfs(s, prioUpdater) {
    // 全图复位
    this.reset();

    // 从s起顺次检查所有顶点
    for (let v = s; v < s + this.n; v++) {
      const i = v % this.n;
      // 一旦遇到尚未发现者
      if (this.V[i].status === VStatus.UNDISCOVERED) {
        // 即从它出发启动一次PFS
        this.PFS(i, prioUpdater);
      }
    }
  }

  /**
   * 优先级搜索算法(单个连通域)
   * @param {number} v 起始顶点编号
   * @param {Function} prioUpdater 优先级更新器
   */
  PFS(v, prioUpdater) {
    // 初始化,起点v加至PFS树中
    this.V[v].priority = 0;
    this.V[v].status = VStatus.VISITED;

    // 逐步将n-1顶点和n-1条边加至PFS树中
    for (let k = 1; k < this.n; k++) {
      // 对v的每一个邻居u
      for (let u = this.firstNbr(v); u !== -1; u = this.nextNbr(v, u)) {
        // 更新其优先级及其父亲
        prioUpdater(this, v, u);
      }

      // 从尚未加入遍历树的顶点中,选出下一个优先级最高的顶点
      let shortest = Number.MAX_SAFE_INTEGER;
      for (let u = 0; u < this.n; u++) {
        if (this.V[u].status === VStatus.UNDISCOVERED && shortest > this.V[u].priority) {
          shortest = this.V[u].priority;
          v = u;
        }
      }
      this.V[v].status = VStatus.VISITED;
      this.E[this.V[v].parent][v].type = EType.TREE; // 将v加入遍历树
    }
  }

  /**
   * 基于DFS的拓扑排序算法(单个连通域)
   * @param {number} v 起始顶点编号
   * @param {number[]} S 存放排序结果的栈
   * @returns {boolean} 如果不存在环则返回true，否则返回false
   */
  TSort(v, clock, S) {
    this.V[v].status = VStatus.DISCOVERED; // 发现顶点v
    this.V[v].dTime = ++clock.value; // 发现时间戳
    // 对v的每一个邻接顶点u
    for (let u = this.firstNbr(v); u !== -1; u = this.nextNbr(v, u)) {
      switch (this.V[u].status) {
        case VStatus.UNDISCOVERED: // u尚未发现
          this.V[u].parent = v;
          this.E[v][u].type = EType.TREE;
          if (!this.TSort(u, clock, S)) {
            // 从顶点u处深入
            return false; // 若u及其后代不能拓扑排序，则返回false
          }
          break;
        case VStatus.DISCOVERED: // u已被发现但尚未访问完毕
          this.E[v][u].type = EType.BACKWARD; // 一旦发现后向边（非DAG），则
          return false; // 发现环，返回false
        default: // u已访问完毕（VISITED）
          this.E[v][u].type = this.V[v].dTime < this.V[u].dTime ? EType.FORWARD : EType.CROSS;
          break;
      }
    }

    this.V[v].status = VStatus.VISITED; // 顶点v被标记为VISITED时，随即入栈
    S.push(this.V[v].data); // 顶点v入栈
    return true;
  }

  /**
   * 基于DFS的拓扑排序算法(全图)
   * @returns {number[] | null} 返回拓扑排序结果，如果存在环则返回null
   */
  tSort(s) {
    this.reset(); // 全图复位
    const clock = { value: 0 }; // 时间戳
    const S = []; // 存放排序结果的栈
    for (let v = s; v < s + this.n; v++) {
      const i = v % this.n;
      if (this.V[i].status === VStatus.UNDISCOVERED) {
        // 一旦遇到尚未发现者
        if (!this.TSort(i, clock, S)) {
          // 即从它出发启动一次TSort
          while (S.length > 0) {
            // 任一连通域（亦即整图）非DAG
            S.pop();
          }
          break;
        }
      }
    }
    return S; // 若输入为DAG，则 S内各顶点自顶向底排序；否则（不存在拓扑排序），S空
  }
}

// 创建测试用例
function testBFS() {
  // 创建图实例
  const graph = new GraphMatrix();

  // 添加顶点 (0-6)
  // 创建如下图所示的结构:
  //    0 -- 1 -- 2
  //    |    |    |
  //    3 -- 4    5
  //         |
  //         6
  for (let i = 0; i < 7; i++) {
    graph.insertVertex(i);
  }

  // 添加边 (这里假设是无向图，所以每条边都要添加两次)
  const edges = [
    [0, 1],
    [0, 3],
    [1, 2],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 6],
  ];

  edges.forEach(([from, to]) => {
    graph.insertEdge(null, 1, from, to);
    graph.insertEdge(null, 1, to, from); // 无向图需要双向添加边
  });
  graph.dfs(0);
  console.log("vertex\tdTime\tfTime\tparent");
  for (let i = 0; i < graph.n; i++) {
    console.log(`${i}\t${graph.V[i].dTime}\t\t${graph.V[i].fTime}\t\t${graph.V[i].parent}`);
  }

  // 打印边的类型
  console.log("\nbfs edge type:");
  for (let i = 0; i < graph.n; i++) {
    for (let j = 0; j < graph.n; j++) {
      if (graph.exists(i, j)) {
        const edgeType = graph.E[i][j].type;
        const typeStr = edgeType === EType.TREE ? "tree" : "cross";
        console.log(`edge ${i}->${j}: ${typeStr}`);
      }
    }
  }
}

// 运行测试
// testBFS();

function testTSort() {
  const graph = new GraphMatrix();
  graph.insertVertex(0);
  graph.insertVertex(1);
  graph.insertVertex(2);
  graph.insertEdge(null, 1, 0, 1);
  graph.insertEdge(null, 1, 1, 2);
  const result = graph.tSort(0);
  console.log(result);
}

testTSort();
