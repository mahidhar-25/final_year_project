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
        for (let i = 2; i < lines.length; i++) {
            const [first_node, second_node] = lines[i].split(' ').map(Number);
            this.graph[first_node].push(second_node);
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


export {Graph}