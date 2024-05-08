const eliminationOrderCode : String = `

C++ code for finding a weak elimination order : 

    vector<int> getWeakEliminationOrder(){
        int n = graph.size();
        if (n == 0)
            return {}; // Handle empty graph case


        vector<int> temp_degree = degree;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        for (int i = 0; i < n; ++i)
        {
            pq.emplace(temp_degree[i], i);
        }


        vector<int> order;
        vector<bool> visited(n, false);
        while (!pq.empty())
        {
            int v = pq.top().second;
            pq.pop();
            if (visited[v])
                continue;
            visited[v] = true;
            order.emplace_back(v);


            for (int u : graph[v])
            {
                if (!visited[u])
                {
                    temp_degree[u]--;
                    pq.emplace(temp_degree[u], u);
                }
            }
        }
        return order;
    }


    TypeScript : 

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
    

`;


const takeGraphDataCode : String = `

C++ code for taking graph data class 

class Graph
{
public:
    vector<vector<int>> graph;
    vector<int> degree;


private:
    int nodes, edges;


public:
    Graph(int nodes = 0, int edges = 0)
    {
        this->nodes = nodes;
        this->edges = edges;
        this->graph.resize(nodes);
        this->degree.resize(nodes);
    }


    void takeGraphData()
    {


        for (int i = 0; i < this->edges / 2; i++)
        {
            int first_node, second_node;
            cin >> first_node >> second_node;
            this->graph[first_node].push_back(second_node);
            this->graph[second_node].push_back(first_node);
            this->degree[first_node]++;
            this->degree[second_node]++;
        }
    }


    vector<vector<int>> getGraph()
    {
        return graph;
    }


    void setGraph(vector<vector<int>> graph)
    {
        this->graph = graph;
    }


    int getNodes()
    {
        return nodes;
    }


    int getEdges()
    {
        return edges;
    }


    void setNodes(int nodes)
    {
        this->nodes = nodes;
    }
    void setEdges(int edges)
    {
        this->edges = edges;
    }
};


Typescript : 

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
}
`;


const PDCBG_CLASS = `

C++ code for PDCBG class

class PairedDominationInChordalNipartiteGraphs
{


public:
    Graph *CBG;
    vector<int> eliminationOrder;


private:

    vector<int> tFunction, sFunction, order, fFunction, D, L, visited;
    vector<vector<int>> sortedNeighboursList; // sorted based on elimination order
    int currentVertex;
    vector<pair<int, int>> pairedDominationEdge; // storing ans


public:
    void orderOfNodes()
    {
        for (int i = 0; i < CBG->getNodes(); i++)
        {
            order[eliminationOrder[i]] = i;
        }
    }




    void sortTheNeighboursList()
    {
        for (auto v : eliminationOrder)
        {
            for (auto c : CBG->graph[v])
            {
                sortedNeighboursList[c].push_back(v);
            }
        }
    }


    void calculateFFunction()
    {
        for (auto c : eliminationOrder)
        {
            fFunction[c] = sortedNeighboursList[c].back();
        }
    }


    void resizeAllVectors(int n)
    {
        order.resize(n);
        visited.resize(n, 0);
        L.resize(n, 0);
        D.resize(n, 0);
        fFunction.resize(n, 0);
    }


    PairedDominationInChordalNipartiteGraphs(int nodes = 0, int edges = 0)
    {
        CBG = new Graph(nodes, edges);
        CBG->takeGraphData();
        sortedNeighboursList.resize(nodes);
        eliminationOrder = CBG->getWeakEliminationOrder();
        resizeAllVectors(CBG->getNodes());
        orderOfNodes();
        sortTheNeighboursList();
        calculateFFunction();
        calculatePairedDomination();
    }

}
`;

const TandSfunctionCode = `
    void calculateTAndSFunction(int i)
    {
        tFunction.clear();
        sFunction.clear();
        for (auto c : sortedNeighboursList[currentVertex])
        {
            if (visited[c] == 0 && L[c] == 1 && CBG->degree[c] == 1)
            {
                tFunction.push_back(c);
            }

            if (order[c] > i && L[c] == 1)
            {
                sFunction.push_back(c);
            }
        }
    }
`;

const getVertexNodesStatus = `
    bool noVertexWithDegreeWithD(int i)
    {
        for (auto c : sortedNeighboursList[eliminationOrder[i]])
        {
            if (D[c] == 0 && visited[c] == 0 && CBG->degree[c] == 1)
            {
                return true;
            }
        }
        return false;
    }

    //note : function 


 
/*
1. go through the neighbour nodes of current vertex 
2. check if node is not visited , degree is one then  return true else false
*/
    bool noVertexWithDegree(int i)
    {
        for (auto c : sortedNeighboursList[eliminationOrder[i]])
        {
            if (visited[c] == 0 && CBG->degree[c] == 1)
            {
                return true;
            }
        }


        return false;
    }
`;

const updateVertexStatus = `
    void markNeighboursCovered(int vertex)
    {
        for (auto c : sortedNeighboursList[vertex])
        {
            D[c] = 1;
        }
    }


    void makePairedDominationEdge(int vertex1, int vertex2)
    {
        L[vertex1] = L[vertex2] = 2;
        pairedDominationEdge.push_back({vertex1, vertex2});
    }

`;

const mainPDCBGCode = `
    void calculatePairedDomination()
    {
        int n = CBG->getNodes();
        for (int i = 0; i < n; i++)
        {
            currentVertex = eliminationOrder[i];
            calculateTAndSFunction(i);

            if (D[currentVertex] == 0 && !noVertexWithDegreeWithD(i))
            {

                /*
                 fFunction[currentVertex] = neighbours list of current vertex ki last element(with highest degree)
                L[fFunction[currentVertex]] = 1 -> we are adding node to our pd but did not find any edge corresponding to it
                */

                L[fFunction[currentVertex]] = D[fFunction[currentVertex]] = 1;
                markNeighboursCovered(fFunction[currentVertex]);
            }
            else if (L[currentVertex] == 0 && noVertexWithDegree(i))
            {
                // T function : it contains vertices that are not visited and having degree 1 and added in out solution and finding for mate
                if (tFunction.size() > 0)
                {
                    for (auto s : tFunction)
                    {
                        for (int j = sortedNeighboursList[s].size() - 1; j >= 0; j--)
                        {
                            if (L[sortedNeighboursList[s][j]] == 0)
                            {
                                makePairedDominationEdge(s, sortedNeighboursList[s][j]);
                                markNeighboursCovered(sortedNeighboursList[s][j]);
                                markNeighboursCovered(s);
                                break;
                            }
                        }
                    }
                }
                else if (noVertexWithDegreeWithD(i))
                {
                    L[currentVertex] = D[currentVertex] = 1;
                    markNeighboursCovered(currentVertex);
                }
            }
  




            if (L[currentVertex] == 1)
            {
                  //S function  : we included nodes such that they are part of pd but not found mate and their order is next in eo
//part of ans + degree 1 + not visited
                if (sFunction.size() > 0)
                {

                    // part of ans
                    // 2 3
                     makePairedDominationEdge(currentVertex, sFunction[0]);
//                     if (tFunction.size() > 0)
//                     {

// // l[c] = 1
//                         // explicit ga degree 1
//                         for (int j = 1; j < (int)tFunction.size(); j++)
//                         {
//                             makePairedDominationEdge(sortedNeighboursList[tFunction[j]][0], tFunction[j]);
//                         }
//                     }
                }
                else
                {
                    // if (L[fFunction[currentVertex]] == 0)
                    // {
                    //     makePairedDominationEdge(currentVertex, fFunction[currentVertex]);
                    //     markNeighboursCovered(fFunction[currentVertex]);
                    //     markNeighboursCovered(currentVertex);
                    // }
                    // else
                    // {
                       
                        for (int j = sortedNeighboursList[currentVertex].size() - 1; j >= 0; j--)
                        {


                            if (order[sortedNeighboursList[currentVertex][j]] < i &&
                                L[sortedNeighboursList[currentVertex][j]] == 0 )
                            {
                                makePairedDominationEdge(currentVertex, sortedNeighboursList[currentVertex][j]);
                                markNeighboursCovered(sortedNeighboursList[currentVertex][j]);
                                
                                break;
                            }
                        }
                    // }
                }
            }


            visited[eliminationOrder[i]] = 1;


            for (auto c : sortedNeighboursList[eliminationOrder[i]])
            {
                if (visited[c] == 0 && CBG->degree[c] > 0)
                    CBG->degree[c]--;
            }
            CBG->degree[currentVertex] = 0;
        }
    }

`;

const backTestCode = `
    bool backTestPairedDomination()
    {
        vector<int> covered(CBG->getNodes(), 0);
        for (auto c : pairedDominationEdge)
        {
            for (auto v : {c.first, c.second})
            {
                for (auto p : sortedNeighboursList[v])
                {
                    covered[p] = 1;
                }
            }
        }


        for (auto c : covered)
        {
            if (c == 0)
                return false;
        }
        return true;
    }
`;
export  {backTestCode, mainPDCBGCode , eliminationOrderCode , takeGraphDataCode , PDCBG_CLASS , TandSfunctionCode , getVertexNodesStatus, updateVertexStatus};