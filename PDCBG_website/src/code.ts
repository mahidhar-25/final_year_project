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

export  {eliminationOrderCode};