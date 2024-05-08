#include <bits/stdc++.h>
using namespace std;


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


    vector<int> getWeakEliminationOrder()
    {
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


};


// 1. min no nodes 
// dominatoion 

// a b 

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


/*
1. going through the neighbour nodes of current vertex which are sorted based on WEO
2. if it is not visited and degree is 1 and it is there in our result but we didnt find mate for it then 
   we will add it to T funcion
3. if node is after current vertex in elimination order and we are searching for mate then we add to S function
*/

// T function : it contains vertices that are not visited and having degree 1 and added in out solution and finding for mate


//order[c] => index of c in elimination order
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


/*
1. go through the neighbour nodes of current vertex 
2. check if node is not visited , degree is one and node is not dominated till now return true else false
*/

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
                    if (tFunction.size() > 0)
                    {

// l[c] = 1
                        // explicit ga degree 1
                        for (int j = 1; j < (int)tFunction.size(); j++)
                        {
                            makePairedDominationEdge(sortedNeighboursList[tFunction[j]][0], tFunction[j]);
                        }
                    }
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


    vector<int> getEliminationOrder()
    {
        return eliminationOrder;
    }


    vector<pair<int, int>> getPairedDominationEdge()
    {
        return this->pairedDominationEdge;
    }


    int getCardinalityOfPairedDomination()
    {
        return 2 * pairedDominationEdge.size();
    }


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
};


int main()
{


    int n, m;
    cin >> n >> m;
    PairedDominationInChordalNipartiteGraphs *PDCBG = new PairedDominationInChordalNipartiteGraphs(n, m);
    vector<pair<int, int>> edges = PDCBG->getPairedDominationEdge();


    cout << "Cardinality : " << PDCBG->getCardinalityOfPairedDomination() << "\n";


    cout << "edges are : ";
    for (auto c : edges)
    {
        cout << "(" << c.first << "," << c.second << ") ";
    }


    cout << "\n";


    if (PDCBG->backTestPairedDomination())
    {
        cout << "Successfully backtest and covered all nodes\n";
    }
    else
    {
        cout << "not covered all nodes from the graph\n";
    }
}
