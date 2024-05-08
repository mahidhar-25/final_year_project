class Graph {
    public graph: number[][];
    public degree: number[];

    private nodes: number;
    private edges: number;

    constructor(nodes = 0, edges = 0) {
        this.nodes = nodes;
        this.edges = edges;
        this.graph = Array.from({length: nodes}, () => []);
        this.degree = Array(nodes).fill(0);
    }

    setConstructorValues(nodes:number , edges:number){
        this.nodes = nodes;
        this.edges = edges;
        this.graph = Array.from({length: nodes}, () => []);
        this.degree = Array(nodes).fill(0);
    }

    public takeGraphData(input: string) {
        const lines = input.split('\n');
         this.setConstructorValues(Number(lines[0]) , Number(lines[1]));
             console.log(this.graph.length , this.nodes);
        for (let i = 2; i < lines.length; i++) {
            const [first_node, second_node] = lines[i].split(' ').map(Number);
            this.graph[first_node].push(second_node);
            console.log("first : " , first_node);
            console.log("second : " , second_node);
            this.graph[second_node].push(first_node);
            this.degree[first_node]++;
            this.degree[second_node]++;
        }
    }

    public getGraph(): number[][] {
        return this.graph;
    }

    public setGraph(graph: number[][]): void {
        this.graph = graph;
    }

    public getNodes(): number {
        return this.nodes;
    }

    public getEdges(): number {
        return this.edges;
    }

    public setNodes(nodes: number): void {
        this.nodes = nodes;
    }

    public setEdges(edges: number): void {
        this.edges = edges;
    }

    public getWeakEliminationOrder(): number[] {
        const n = this.graph.length;
        if (n === 0) return []; // Handle empty graph case

        let temp_degree = [...this.degree];
        let pq: [number, number][] = [];
        for (let i = 0; i < n; ++i) {
            pq.push([temp_degree[i], i]);
        }

        pq.sort((a, b) => a[0] - b[0]);

        let order: number[] = [];
        let visited: boolean[] = Array(n).fill(false);
        while (pq.length > 0) {
            let v = pq.shift()![1];
            if (visited[v]) continue;
            visited[v] = true;
            order.push(v);

            for (let u of this.graph[v]) {
                if (!visited[u]) {
                    temp_degree[u]--;
                    pq.push([temp_degree[u], u]);
                    pq.sort((a, b) => a[0] - b[0]);
                }
            }
        }
        return order;
    }
}



class PairedDominationInChordalNipartiteGraphs {
  CBG: Graph;
  eliminationOrder: number[];
  tFunction: number[] = [];
  sFunction: number[] = [];
  order: number[] = [];
  fFunction: number[] = [];
  D: number[] = [];
  L: number[] = [];
  visited: number[] = [];
  sortedNeighboursList: number[][];
  currentVertex!: number;
  pairedDominationEdge: [number, number][] = [];

  constructor( input:string , nodes: number = 0, edges: number = 0 ) {
    this.CBG = new Graph(nodes, edges);
    this.CBG.takeGraphData(input);
    this.sortedNeighboursList = Array.from({ length: this.CBG.getNodes() }, () => []);
      console.log("sortedlisy : " ,this.sortedNeighboursList.length);
    this.eliminationOrder = this.CBG.getWeakEliminationOrder();
    this.resizeAllVectors(this.CBG.getNodes());
    this.orderOfNodes();
    this.sortTheNeighboursList();
    this.calculateFFunction();
    this.calculatePairedDomination();
  }

  orderOfNodes() {
    for (let i = 0; i < this.CBG.getNodes(); i++) {
      this.order[this.eliminationOrder[i]] = i;
    }
  }

  sortTheNeighboursList() {
    for (const v of this.eliminationOrder) {
      for (const c of this.CBG.graph[v]) {
          console.log("c : " , c);
          console.log("v : ", v);
        this.sortedNeighboursList[c].push(v);
      }
    }
  }

  calculateFFunction() {
    for (const c of this.eliminationOrder) {
      this.fFunction[c] = this.sortedNeighboursList[c][this.sortedNeighboursList[c].length - 1];
    }
  }

  resizeAllVectors(n: number) {
    this.order = new Array(n).fill(0);
    this.visited = new Array(n).fill(0);
    this.L = new Array(n).fill(0);
    this.D = new Array(n).fill(0);
    this.fFunction = new Array(n).fill(0);
  }

  calculateTAndSFunction(i: number) {
    this.tFunction = [];
    this.sFunction = [];
    for (const c of this.sortedNeighboursList[this.currentVertex]) {
      if (this.visited[c] === 0 && this.L[c] === 1 && this.CBG.degree[c] === 1) {
        this.tFunction.push(c);
      }

      if (this.order[c] > i && this.L[c] === 1) {
        this.sFunction.push(c);
      }
    }
  }

  noVertexWithDegreeWithD(i: number) {
    for (const c of this.sortedNeighboursList[this.eliminationOrder[i]]) {
      if (this.D[c] === 0 && this.visited[c] === 0 && this.CBG.degree[c] === 1) {
        return true;
      }
    }
    return false;
  }

  noVertexWithDegree(i: number) {
    for (const c of this.sortedNeighboursList[this.eliminationOrder[i]]) {
      if (this.visited[c] === 0 && this.CBG.degree[c] === 1) {
        return true;
      }
    }
    return false;
  }

  markNeighboursCovered(vertex: number) {
    for (const c of this.sortedNeighboursList[vertex]) {
      
      this.D[c] = 1;
    }
  }

  makePairedDominationEdge(vertex1: number, vertex2: number) {
    this.L[vertex1] = this.L[vertex2] = 2;
    this.pairedDominationEdge.push([vertex1, vertex2]);
  }
    printPairedDominationEdge() {
    for (const edge of this.pairedDominationEdge) {
      console.log(`[${edge[0]}, ${edge[1]}]`);
    }
  }

  calculatePairedDomination() {

   
  
    const n = this.CBG.getNodes();
    let logs: ([number, number[], number[], number[], number[], number, number[], number[][], number[], number[], string[]])[] = new Array(n);
    for (let i = 0; i < n; i++) {
      this.currentVertex = this.eliminationOrder[i];
      this.calculateTAndSFunction(i);

    //  logs[i][0] = this.currentVertex;
    //   console.log("vertex : " , this.eliminationOrder[i]);
    //   logs[i][1] = [this.D[this.currentVertex] , this.L[this.currentVertex]];

    //   logs[i][3] = this.tFunction;
    //   logs[i][4] = this.sFunction;
    //   console.log("T function : " , this.tFunction);
    //   console.log("s function : " , this.sFunction);
      // [number , number , number , [number] , [number] , number , [number] , [number] , [number] , [number] , [string]]
//[currentVertex , D , L , T , S , f , D\s , L\s , neighbours_orignal , neighbours_current , logs]
      if (this.D[this.currentVertex] === 0 && !this.noVertexWithDegreeWithD(i)) {
        // logs[i][10].push(`Till now it is not dominated , only one edge so we are including f(current_vertex)`);
        this.L[this.fFunction[this.currentVertex]] = this.D[this.fFunction[this.currentVertex]] = 1;
        this.markNeighboursCovered(this.fFunction[this.currentVertex]);
      } else if (this.L[this.currentVertex] === 0 && this.noVertexWithDegree(i)) {
        if (this.tFunction.length > 0) {
          for (const s of this.tFunction) {
            for (let j = this.sortedNeighboursList[s].length - 1; j >= 0; j--) {
              if (this.L[this.sortedNeighboursList[s][j]] === 0) {
                this.makePairedDominationEdge(s, this.sortedNeighboursList[s][j]);
                this.markNeighboursCovered(this.sortedNeighboursList[s][j]);
                this.markNeighboursCovered(s);
                break;
              }
            }
          }
        } else if (this.noVertexWithDegreeWithD(i)) {
          this.L[this.currentVertex] = this.D[this.currentVertex] = 1;
          this.markNeighboursCovered(this.currentVertex);
        }
      }

      if (this.L[this.currentVertex] === 1) {
        if (this.sFunction.length > 0) {
          this.makePairedDominationEdge(this.currentVertex, this.sFunction[0]);
        } else {
          for (let j = this.sortedNeighboursList[this.currentVertex].length - 1; j >= 0; j--) {
            if (this.order[this.sortedNeighboursList[this.currentVertex][j]] < i &&
                this.L[this.sortedNeighboursList[this.currentVertex][j]] === 0) {
              this.makePairedDominationEdge(this.currentVertex, this.sortedNeighboursList[this.currentVertex][j]);
              this.markNeighboursCovered(this.sortedNeighboursList[this.currentVertex][j]);
              break;
            }
          }
        }
      }

      this.visited[this.eliminationOrder[i]] = 1;

      for (const c of this.sortedNeighboursList[this.eliminationOrder[i]]) {
        if (this.visited[c] === 0 && this.CBG.degree[c] > 0) {
          this.CBG.degree[c]--;
        }
      }
      this.CBG.degree[this.currentVertex] = 0;
    }
  }

  getEliminationOrder() {
    return this.eliminationOrder;
  }

  getPairedDominationEdge() {
    return this.pairedDominationEdge;
  }

  getCardinalityOfPairedDomination() {
    return 2 * this.pairedDominationEdge.length;
  }

  backTestPairedDomination() {
    const covered = new Array(this.CBG.getNodes()).fill(0);
    for (const c of this.pairedDominationEdge) {
      for (const v of [c[0], c[1]]) {
        for (const p of this.sortedNeighboursList[v]) {
          covered[p] = 1;
        }
      }
    }

    for (const c of covered) {
      if (c === 0) return false;
    }
    return true;
  }
}


export {Graph , PairedDominationInChordalNipartiteGraphs}