function parseTextData(textData: string): {
    nodes: any;
    edges: any;
    labels: any;
} {
    const lines = textData.trim().split("\n");
    const nodeCount = parseInt(lines[0]);
    const edgeCount = parseInt(lines[1]);
    let a = -580,b = -640;

    const parsedNodes: any = {};
    const parsedEdges: any = {};
    const labels: any = {
        nodes: {},
    };

    const adjacencyList: number[][] = new Array(nodeCount)
        .fill(null)
        .map(() => []);

    for (let i = 2; i < lines.length; i++) {
        const [source, target] = lines[i]
            .split(" ")
            .map((num) => parseInt(num));

        const sourceNode = `node${source}`;
        const targetNode = `node${target}`;

        if (!parsedNodes[sourceNode]) {
            parsedNodes[sourceNode] = {
                name: `Node ${source}`,
                size: 24,
                nodeNo: ` ${source}`,
            };
            labels["nodes"][sourceNode] = {
                x: a + 120,
                y: 0,
            };
            a += 120;
        }
        if (!parsedNodes[targetNode]) {
            parsedNodes[targetNode] = {
                name: `Node ${target}`,
                size: 24,
                nodeNo: ` ${target}`,
            };
            labels["nodes"][targetNode] = {
                x: b + 80,
                y: 240,
            };

            b += 80;
        }

        const edgeKey = `edge${i - 1}`;
        parsedEdges[edgeKey] = { source: sourceNode, target: targetNode };

        // Add edges to adjacency list for BFS
        adjacencyList[source].push(target);
        adjacencyList[target].push(source); // Assuming it's an undirected graph
    }

    const colors: string[] = new Array(nodeCount).fill("");

    const bfs = (node: number) => {
        const queue: number[] = [];
        queue.push(node);
        colors[node] = "blue";

        while (queue.length > 0) {
            const current = queue.shift()!;
            const neighbors = adjacencyList[current];

            for (const neighbor of neighbors) {
                if (colors[neighbor] === "") {
                    queue.push(neighbor);
                    colors[neighbor] =
                        colors[current] === "blue" ? "pink" : "blue"; // Alternate colors for bipartite graph
                } else if (colors[neighbor] === colors[current]) {
                    // Not a bipartite graph
                    return false;
                }
            }
        }
        return true;
    };

    // Check if the graph is bipartite
    let isBipartite = true;
    for (let node = 0; node < nodeCount; node++) {
        if (colors[node] === "") {
            if (!bfs(node)) {
                isBipartite = false;
                break;
            }
        }
    }

    // Assign colors to parsedNodes based on graph type
    for (const node in parsedNodes) {
        parsedNodes[node].color = isBipartite
            ? colors[parseInt(node.replace("node", ""))]
            : "blue";
    }

    return { nodes: parsedNodes, edges: parsedEdges, labels };
}

export {parseTextData};