import type { Node } from "./DataHelper";

// function parseTextData(textData: string): {
//     nodes: any;
//     edges: any;
//     labels: any;
// } {
//     const lines = textData.trim().split("\n");
//     const { nodeCount, edgeCount } = getGraphCounts(lines);
//     let a = -580, b = -640;

//     let parsedNodes = createNodes(nodeCount, lines, a, b);
//     const {parsedEdges , adjacencyList}= createEdges(nodeCount, lines, parsedNodes);
//     const labels = createLabels(parsedNodes);
//     parsedNodes = checkBipartiteAndColorNode(nodeCount ,adjacencyList , parsedNodes );

//     return { nodes: parsedNodes, edges: parsedEdges, labels };
// }

function getGraphCounts(lines: string[]): { nodeCount: number; edgeCount: number } {
    return {
        nodeCount: parseInt(lines[0]),
        edgeCount: parseInt(lines[1]),
    };
}

function getNodeId(nodeNumber : number){
    return `node${nodeNumber}`;
}
function createNodes(nodeCount: number, lines: string[], a: number, b: number): any {
    const parsedNodes: any = {};
    let x = a, y = b;

    for (let i = 2; i < lines.length; i++) {
        const [source, target] = lines[i].split(" ").map((num) => parseInt(num));

        const sourceNode = getNodeId(source);
        const targetNode = getNodeId(target);

        if (!parsedNodes[sourceNode]) {
            parsedNodes[sourceNode] = createNodeObject(source, x+140, 0);
            x += 120;
        }
        if (!parsedNodes[targetNode]) {
            parsedNodes[targetNode] = createNodeObject(target, y+80, 200);
            y += 80;
        }
    }

    return parsedNodes;
}

function createNodeObject(nodeNumber: number, x: number=0, y: number=0): Node {
    return {
        name: `Node ${nodeNumber}`,
        size: 24,
        nodeNo: `${nodeNumber}`,
        color : "blue",
        x,
        y,
    };
}

function createEdges(nodeCount: number, lines: string[]): any {
    const parsedEdges: any = {};
      const adjacencyList: number[][] = new Array(nodeCount)
        .fill(null)
        .map(() => []);

    for (let i = 2; i < lines.length; i++) {
        const [source, target] = lines[i].split(" ").map((num) => parseInt(num));
        const sourceNode = getNodeId(source);
        const targetNode = getNodeId(target);

        const edgeKey = `edge${i - 1}`;
        parsedEdges[edgeKey] = { source: sourceNode, target: targetNode };

        adjacencyList[source].push(target);
        adjacencyList[target].push(source); // Assuming it's an undirected graph
    }

    return {parsedEdges , adjacencyList};
}

function createLabels(parsedNodes: any): any {
    const labels: any = { nodes: {} };
    for (const node in parsedNodes) {
        labels.nodes[node] = { x: parsedNodes[node].x, y: parsedNodes[node].y };
    }
    return labels;
}

// export { parseTextData };


function checkBipartiteAndColorNode(nodeCount:number , adjacencyList:number[][] , parsedNodes:any){
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

    return parsedNodes;

}


function parseTextData(textData: string): {
    nodes: any;
    edges: any;
    labels: any;
} {
    let a = -580,b = -640;
    const lines = textData.trim().split("\n");
     const { nodeCount, edgeCount } = getGraphCounts(lines);  
const {parsedEdges , adjacencyList}= createEdges(nodeCount, lines);
let parsedNodes: any = createNodes(nodeCount , lines , a , b);
parsedNodes = checkBipartiteAndColorNode(nodeCount , adjacencyList , parsedNodes);
const labels = createLabels(parsedNodes);

    return { nodes: parsedNodes, edges: parsedEdges, labels };
}

export {parseTextData , createEdges , createNodeObject , createNodes , getNodeId};

