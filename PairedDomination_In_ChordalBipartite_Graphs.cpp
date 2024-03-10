#include <bits/stdc++.h>
using namespace std;

vector<int> findWeakEliminationOrdering(const vector<vector<int>> &graph)
{
    int n = graph.size();
    vector<int> degree(n, 0);
    for (int i = 0; i < n; ++i)
    {
        degree[i] = graph[i].size();
    }

    // Min-heap to get the vertex with the smallest degree
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    for (int i = 0; i < n; ++i)
    {
        pq.push({degree[i], i});
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
        order.push_back(v);

        for (int u : graph[v])
        {
            if (!visited[u])
            {
                degree[u]--;
                pq.push({degree[u], u});
            }
        }
    }

    return order;
}

bool no_Vertex_with_degree_In_Neighbour_vertices(int i, int degree, vector<int> degree_of_vertex, vector<vector<int>> sorted_neighbours_list, vector<int> weak_elimination_order, vector<int> visited_vertex)
{

    for (auto c : sorted_neighbours_list[weak_elimination_order[i]])
    {
        if (visited_vertex[c] == 0 && degree_of_vertex[c] == degree)
        {
            return true;
        }
    }

    return false;
}

bool no_Vertex_with_degree_In_Neighbour_vertices_with_D(int i, int degree, int dvalue,
                                                        vector<int> degree_of_vertex, vector<vector<int>> sorted_neighbours_list, vector<int> weak_elimination_order, vector<int> D, vector<int> visited_vertex)
{

    for (auto c : sorted_neighbours_list[weak_elimination_order[i]])
    {
        if (D[c] == dvalue && visited_vertex[c] == 0 && degree_of_vertex[c] == degree)
        {
            cout << sorted_neighbours_list[c].size() << "\n";
            cout << c << "\n";
            return true;
        }
    }

    return false;
}

void Paired_Domination_Set_In_Chordal_Bipartiate(vector<vector<int>> neighbours_list, vector<int> degree_of_vertex,
                                                 vector<int> order_of_vertex, vector<int> weak_elimination_order, vector<vector<int>> sorted_neighbours_list,
                                                 vector<int> f_function, vector<int> D, vector<int> L, vector<pair<int, int>> &paired_domination_edge,
                                                 vector<int> visited_vertex, int no_of_vertices)
{

    cout << "==================PD_CBG================\n";

    cout << "degree of vertes : \n";
    for (auto c : degree_of_vertex)
    {
        cout << c << " ";
    }
    cout << "\n";

    for (int i = 0; i < no_of_vertices; i++)
    {
        vector<int> t_function_at_ith_iteration;
        vector<int> s_function_at_ith_iteration;

        t_function_at_ith_iteration.clear();
        s_function_at_ith_iteration.clear();

        cout << "--------------------------iteration - " << i << "--------------------\n";

        cout << "vertices : ";
        for (int p = 0; p < no_of_vertices; p++)
        {
            cout << " " << p << " | ";
        }
        cout << "\n";
        cout << "D[v] :     ";
        for (int p = 0; p < no_of_vertices; p++)
        {
            cout << " " << D[p] << " | ";
        }
        cout << "\n";
        cout << "L[v] :     ";
        for (int p = 0; p < no_of_vertices; p++)
        {
            cout << " " << L[p] << " | ";
        }
        cout << "\n";
        cout << "degree[v] :";
        for (int p = 0; p < no_of_vertices; p++)
        {
            cout << " " << degree_of_vertex[p] << " | ";
        }
        cout << "\n";

        int current_vertex = weak_elimination_order[i];
        cout << "current vertex : " << current_vertex << "\n";
        //  condition : D[Vi] == 0 , Gi has no vertex v belongs to N(Gi)(Vi) such that d(Gi) = 1 and D[v] == 0

        cout << "t : [";

        for (auto c : sorted_neighbours_list[current_vertex])
        {

            if (visited_vertex[c] == 0 && L[c] == 1 && degree_of_vertex[c] == 1)
            {

                t_function_at_ith_iteration.push_back(c);
                cout << c << ",";
            }
        }
        cout << "]\n";

        cout << "s = [";

        for (auto c : sorted_neighbours_list[current_vertex])
        {

            if (order_of_vertex[c] > i && L[c] == 1)
            {

                s_function_at_ith_iteration.push_back(c);
                cout << c << ",";
            }
        }
        cout << "]\n";

        if (D[current_vertex] == 0 && !no_Vertex_with_degree_In_Neighbour_vertices_with_D(i, 1, 0, degree_of_vertex, sorted_neighbours_list, weak_elimination_order, D, visited_vertex))
        {

            cout << "entered if condition D[" << current_vertex << "] = 0\n";

            L[f_function[current_vertex]] = 1;

            D[f_function[current_vertex]] = 1;

            cout << "f(" << current_vertex << ") = " << f_function[current_vertex] << "\n";

            cout << "L[f(" << current_vertex << ")] = 1\n";

            // as we selected vertex we will go through all neighbours and mark them as 1
            cout << "D[" << f_function[current_vertex] << "] = 1 \n";
            for (auto c : sorted_neighbours_list[f_function[current_vertex]])
            {

                D[c] = 1;

                cout << "D[" << c << "] = 1 \n";
            }
        }

        // consition : D[Vi] == 0 , Gi has no vertex v belongs to N(Gi)(Vi) such that d(Gi) = 1

        else if (L[current_vertex] == 0 && no_Vertex_with_degree_In_Neighbour_vertices(i, 1, degree_of_vertex, sorted_neighbours_list, weak_elimination_order, visited_vertex))
        {

            // T(Vi) = {v belongs to N(Gi)(vi) | L[v] = 1 and d(Gi) = 1}

            cout << "entered else if condition : L[" << current_vertex << "] = 0\n";

            if (t_function_at_ith_iteration.size() > 0)
            {

                for (auto s : t_function_at_ith_iteration)
                {
                    for (int j = sorted_neighbours_list[s].size() - 1; j >= 0; j--)
                    {

                        if (L[sorted_neighbours_list[s][j]] == 0)
                        {
                            L[s] = 2;
                            L[sorted_neighbours_list[s][j]] = 2;

                            for (auto c : sorted_neighbours_list[sorted_neighbours_list[s][j]])
                            {
                                D[c] = 1;
                                cout << "D[" << c << "] = 1 \n";
                            }
                            cout << "L[" << s << "] = 2\n";
                            cout << "L[" << sorted_neighbours_list[s][j] << "] = 2\n";

                            paired_domination_edge.push_back({s, sorted_neighbours_list[s][j]});
                            break;
                        }
                    }
                }

                cout << "-------------going through all the values of t ----------------\n";
                for (int j = 1; j < (int)t_function_at_ith_iteration.size(); j++)
                {

                    // get the first digit

                    // fo to neighbours list such that order of  and l[v] = 0;

                    for (int k = sorted_neighbours_list[t_function_at_ith_iteration[j]].size() - 1; k >= 0; k--)
                    {

                        if (L[sorted_neighbours_list[t_function_at_ith_iteration[j]][k]] == 0)
                        {
                            L[t_function_at_ith_iteration[j]] = 2;
                            L[sorted_neighbours_list[t_function_at_ith_iteration[j]][k]] = 2;

                            for (auto c : sorted_neighbours_list[sorted_neighbours_list[t_function_at_ith_iteration[j]][k]])
                            {
                                D[c] = 1;
                                cout << "D[" << c << "] = 1 \n";
                            }
                            cout << "L[" << t_function_at_ith_iteration[j] << "] = 2\n";
                            cout << "L[" << sorted_neighbours_list[t_function_at_ith_iteration[j]][k] << "] = 2\n";

                            paired_domination_edge.push_back({t_function_at_ith_iteration[j], sorted_neighbours_list[t_function_at_ith_iteration[j]][k]});
                            break;
                        }
                    }
                }
            }
            else if (no_Vertex_with_degree_In_Neighbour_vertices_with_D(i, 1, 0, degree_of_vertex, sorted_neighbours_list, weak_elimination_order, D, visited_vertex))
            {

                L[current_vertex] = 1;
                D[current_vertex] = 1;
                cout << "D[" << current_vertex << "] = 1 \n";
                cout << "L[" << current_vertex << "] = 1\n";
                for (auto c : sorted_neighbours_list[current_vertex])
                {
                    D[c] = 1;
                    cout << "D[" << c << "] = 1 \n";
                }
            }
        }

        if (L[current_vertex] == 1)
        {

            cout << "entered if condition : L[" << current_vertex << "] = 1\n";

            if (s_function_at_ith_iteration.size() > 0)
            {

                if (t_function_at_ith_iteration.size() > 0)
                {

                    L[current_vertex] = 2;
                    L[s_function_at_ith_iteration[0]] = 2;

                    cout << "first value : " << s_function_at_ith_iteration[0] << "\n";

                    cout << "L[" << current_vertex << "] = 2\n";
                    cout << "L[" << s_function_at_ith_iteration[0] << "] = 2\n";
                    paired_domination_edge.push_back({current_vertex, s_function_at_ith_iteration[0]});

                    for (int j = 1; j < (int)t_function_at_ith_iteration.size(); j++)
                    {

                        // get the first digit

                        // fo to neighbours list such that order of vertex > i and l[v] = 1;

                        //--------------------

                        for (auto c : sorted_neighbours_list[t_function_at_ith_iteration[j]])
                        {

                            cout << c << "---" << order_of_vertex[c] << "====" << t_function_at_ith_iteration[j] << "----" << order_of_vertex[t_function_at_ith_iteration[j]] << "\n";
                            if (true)
                            {

                                L[c] = 2;
                                L[t_function_at_ith_iteration[j]] = 2;

                                cout << "L[" << c << "] = 2\n";
                                cout << "L[" << t_function_at_ith_iteration[j] << "] = 2\n";
                                paired_domination_edge.push_back({c, t_function_at_ith_iteration[j]});
                                break;
                            }
                        }
                    }
                }
                else
                {

                    L[current_vertex] = 2;
                    L[s_function_at_ith_iteration[0]] = 2;

                    cout << "L[" << current_vertex << "] = 2\n";
                    cout << "L[" << s_function_at_ith_iteration[0] << "] = 2\n";
                    paired_domination_edge.push_back({current_vertex, s_function_at_ith_iteration[0]});
                }
            }
            else
            {

                if (L[f_function[current_vertex]] == 0)
                {

                    cout << "else , if consition : L[" << f_function[current_vertex] << "] = 0\n";
                    L[current_vertex] = 2;
                    L[f_function[current_vertex]] = 2;

                    cout << "L[" << current_vertex << "] = 2\n";
                    cout << "L[" << f_function[current_vertex] << "] = 2\n";
                    paired_domination_edge.push_back({current_vertex, f_function[current_vertex]});
                    for (auto c : sorted_neighbours_list[f_function[current_vertex]])
                    {
                        D[c] = 1;

                        cout << "D[" << c << "] = 1 \n";
                    }
                }
                else
                {
                    L[current_vertex] = 2;
                    cout << "else , else consition : L[" << current_vertex << "] = 2\n";

                    for (int j = sorted_neighbours_list[current_vertex].size() - 1; j >= 0; j--)
                    {

                        if (order_of_vertex[sorted_neighbours_list[current_vertex][j]] < i && L[sorted_neighbours_list[current_vertex][j]] == 0 && D[sorted_neighbours_list[current_vertex][j]] == 1)
                        {

                            L[sorted_neighbours_list[current_vertex][j]] = 2;

                            cout << "else , else consition : L[" << sorted_neighbours_list[current_vertex][j] << "] = 2\n";

                            paired_domination_edge.push_back({current_vertex, sorted_neighbours_list[current_vertex][j]});
                            break;
                        }
                    }
                }
            }
        }

        visited_vertex[weak_elimination_order[i]] = 1;

        for (auto c : sorted_neighbours_list[weak_elimination_order[i]])
        {
            if (visited_vertex[c] == 0 && degree_of_vertex[c] > 0)
                degree_of_vertex[c]--;
        }
        degree_of_vertex[current_vertex] = 0;
        cout << "-----------------------------------------end-------------------------\n";
    }
}

int main()
{

    cout << "================================================================== \n";
    int no_of_vertices, no_of_edges;

    //  cout << "Enter no of vertices and edges : ";

    cin >> no_of_vertices >> no_of_edges;

    // intializing the degree of vertices

    // order_of_vertex

    vector<vector<int>> neighbours_list(no_of_vertices);
    vector<int> degree_of_vertex(no_of_vertices, 0);
    vector<int> order_of_vertex(no_of_vertices, 0);
    vector<int> weak_elimination_order(no_of_vertices);
    vector<vector<int>> sorted_neighbours_list(no_of_vertices);
    vector<int> f_function(no_of_vertices);
    vector<int> D(no_of_vertices, 0), L(no_of_vertices, 0);
    vector<pair<int, int>> paired_domination_edge;
    vector<int> visited_vertex(no_of_vertices, 0);

    for (int i = 0; i < no_of_edges / 2; i++)
    {

        int first_node, second_node;

        cin >> first_node >> second_node;

        neighbours_list[first_node].push_back(second_node);
        neighbours_list[second_node].push_back(first_node);
    }

    weak_elimination_order = findWeakEliminationOrdering(neighbours_list);

    cout << "\n";

    cout << "----------------got the edges --------------------\n";

    // inpput the elimantion order for now

    //   cout << "enter the weak elimanation order of chordal bipartiate graph : ";

    for (int i = 0; i < no_of_vertices; i++)
    {
        //  cin >> weak_elimination_order[i];

        order_of_vertex[weak_elimination_order[i]] = i;
    }

    cout << "--------------------got the elimanation order ------------------\n";

    // sort the nighbours list according to the weak elimination order

    /*

    step1 : going through all the vertices of weak elimination order

    step2 : going through all the neighbours of that specific vertex a

    step3 : pushing into their index.

    */

    for (auto v : weak_elimination_order)
    {
        for (auto c : neighbours_list[v])
        {
            cout << c << "---" << v << "\n";
            sorted_neighbours_list[c].push_back(v);
        }

        degree_of_vertex[v] = neighbours_list[v].size();
    }

    cout << "-----------------sorted the neighbourse------------------------------\n";

    /*

     calculatr f function

     f(vj) = vj* || where j* is max{k | vkvj belongs to E , k >= j}

    */
    cout << "loop not yet started\n";

    cout << "weak elimination order : \n";
    for (auto c : weak_elimination_order)
    {
        cout << c << " ";
    }
    cout << "\n";

    cout << "sorted neighbours list : \n";
    for (auto c : sorted_neighbours_list)
    {
        for (auto p : c)
        {
            cout << p << " ";
        }
        cout << "\n";
    }

    // return 0;

    for (int i = 0; i < no_of_vertices; i++)
    {

        f_function[weak_elimination_order[i]] = sorted_neighbours_list[weak_elimination_order[i]].back();
        cout << "f(" << weak_elimination_order[i] << ") = " << f_function[weak_elimination_order[i]] << "\n";
    }

    cout << "------------------------calculated f function --------------------------\n";

    Paired_Domination_Set_In_Chordal_Bipartiate(neighbours_list, degree_of_vertex, order_of_vertex, weak_elimination_order, sorted_neighbours_list, f_function, D, L, paired_domination_edge, visited_vertex, no_of_vertices);

    for (auto c : paired_domination_edge)
    {
        cout << c.first << "-----> " << c.second << "\n";
    }
    // intialize a D , L array with Zero

    // intializing a pairt int , int

    // find the intersection of neighbours with L[v] = 1 for k>i

    // as we know sorted eighbours list will be in order , L is index based

    // k < neigbhour[current vertex].size()

    // for(int p = 0 ; p <  sorted_neighbours_list[weak_elimination_order[i]].size() ; p++ ){

    //     if(visited_vertex[p] == 1 && order_of_vertex[sorted_neighbours_list[weak_elimination_order[i]][p]] > i){

    //         k = i;
    //         break;
    //     }
    // }

    // for(int j = k ; j < no_of_vertices && k < sorted_neighbours_list[weak_elimination_order[i]].size() ; j++){

    //     if(L[j] == 1){
    //         // i need to check if vertex j is in neighbours list or not

    //       while(j > k){

    //       }

    //     }

    // }

    return 0;
}

