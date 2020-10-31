/*
 * minimumPathCover function calcurates the minimum path cover of given
 * DAG. n is the number of node in the DAG and edges is the array of edge,
 * [from, to]. It returns an array of path which is the array of node ID.
 * Node ID is 0..n.
 *
 * If the input graph is cyclic, the behavior is undefined.
 */
export function minimumPathCover(n: number, edges: readonly (readonly [from: number, to: number])[]) {
  // DAG
  // Number of nodes: n
  // Edges: edges
  const inedges = Array(n).fill([]);
  const outedges = Array(n).fill([]);
  for (const edge of edges) {
    if (edge[0] < 0 || edge[0] >= n || edge[1] < 0 || edge[1] >= n) throw new Error(`Invalid edge is passed: ${edge}`);
    inedges[edge[1]] = [...inedges[edge[1]]!, edge[0]];
    outedges[edge[0]] = [...outedges[edge[0]]!, edge[1]];
  }

  // Minimum Path Cover

  const bipartiteGraph = toBipartiteGraph(n, inedges, outedges);

  // maximalMatching extracts the graph including only optimum paths. The return
  // value is the adjacency list(but always contains only one node) of new
  // bipartite graph.
  const optimalBipartiteGraph = maximalMatching(n, bipartiteGraph);

  const optimalDag = toDag(n, optimalBipartiteGraph);

  return calcPaths(n, optimalDag);
}

/*
 * Convert from DAG to bipartite graph. The each node is splitted to two, one
 * has only the inedges and other has only the outedges.
 */
function toBipartiteGraph(n: number, inedges: number[][], outedges: number[][]) {
  const bipartiteAdjList: number[][] = new Array(2 * n).fill([]);
  for (const [key, nodes] of outedges.entries()) {
    bipartiteAdjList[key] = nodes.map(node => node + n);
  }
  for (const [key, nodes] of inedges.entries()) {
    bipartiteAdjList[key + n] = nodes;
  }
  return bipartiteAdjList;
}

function toDag(n: number, bipartiteGraph: number[]): number[] {
  return bipartiteGraph.map(v => v === -1 ? v : v - n);
}

/*
 * Calculate the maximal matching of the given bipartite graph. The return value
 * explains the directed edges; from #key to #value. The value is -1 if no edge.
 * edges is adjacency list.
 */
function maximalMatching(n: number, edges: number[][]): number[] {
  const matchPair: number[] = Array(n * 2).fill(-1); // TODO: 二部グラフのBからみるか、どうにかするかで半分の長さにできる
  for (let v = 0; v < n; v++) {
    const visited: boolean[] = new Array(n * 2).fill(false);
    findArgumentingPath(edges, v, visited, matchPair);
  }

  const ret = new Array(n * 2).fill(-1);
  for (const [b, a] of matchPair.entries()) {
    if (a !== -1) ret[a] = b;
  }
  return ret;
}

// edges[v] is the list of node connected from v.
function findArgumentingPath(edges: number[][], v: number, visited: boolean[], matchPair: number[]) {
  for (const u of edges[v]) {
    if (visited[u]) continue;
    visited[u] = true;
    if (matchPair[u] == -1 || findArgumentingPath(edges, matchPair[u], visited, matchPair)) { // 交互路と交互路を既存のマッチングで挟んでつなげると、それもまた交互路である
      matchPair[u] = v;
      return true;
    }
  }
  return false;
}

function calcPaths(n: number, adjMap: number[]) {
  const indegrees = new Array(n).fill(0);
  for (const dst of adjMap) {
    if (dst !== -1) indegrees[dst]++;
  }

  // ss is the list of the node whose indegree is 0.
  const ss: number[] = [...indegrees.entries()].filter(([, indegree]) => indegree === 0).map(([i]) => i);

  return ss.map(p => {
    const path: number[] = [p];
    while (adjMap[p] !== -1) {
      p = adjMap[p];
      path.push(p);
    }
    return path;
  });
}
