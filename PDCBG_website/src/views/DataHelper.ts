import * as vNG from "v-network-graph";
import { defineConfigs } from "v-network-graph";
interface Node extends vNG.Node {
    size: number;
    color: string;
    label?: boolean;
    x?:number,
    y?:number
}

interface Edge extends vNG.Edge {
    width?: number;
    color?: string;
    dashed?: boolean;
}
// Define nodes and edges as ref objects
const nodes : Record<string, Node> = {
    node1: { name: "Node 1", color: "black", size: 16, nodeNo: "1"  },
    node2: { name: "Node 2", color: "blue", size: 24, nodeNo: "2" },
    node3: { name: "Node 3", color: "blue", size: 16, nodeNo: "3" },
    node4: { name: "Node 4", color: "blue", size: 16, nodeNo: "4" },
};

const edges : Record<string, Edge> = {
    edge1: { source: "node1", target: "node2" },
    edge2: { source: "node2", target: "node3" },
    edge3: { source: "node3", target: "node4" },
};

const layouts:vNG.Layouts = {
    nodes: {
        node1: { x: 0, y: 0 },
        node2: { x: 80, y: 80 },
        node3: { x: 160, y: 0 },
        node4: { x: 240, y: 80 },
        node5: { x: 320, y: 0 },
        node6: { x: 400, y: 80 },
        node7: { x: 480, y: 0 },
        node8: { x: 560, y: 80 },
    },
};

const configs = defineConfigs<Node, Edge>({
    node: {
     
        normal: {
            type: "circle",
            radius: (node) => 24, // Use the value of each node object
            color: (node) => node.color,
        },
        hover: {
            radius: (node) => 24 + 2,
            color: (node) => node.color,
        },
        selectable: true,
        label: {
            visible: true,
            fontFamily: undefined,
            fontSize: 11,
            lineHeight: 1.1,
            color: "#fffff",
            margin: 4,
            direction: "south",
            text: (node) => node.nodeNo, // Use the nodeNo property of each node
            
          directionAutoAdjustment: true,
    
        },
        focusring: {
            color: "darkgray",
        },
    },
});


const eliminationOrderConfig = defineConfigs<Node , Edge>({
    node: {
        normal: {
            type: "circle",
            radius: (node) => 24, // Use the value of each node object
            color: (node) => node.color,
        },
        hover: {
            radius: (node) => 24 + 2,
            color: (node) => node.color,
        },
        selectable: 1,
        label: {
            visible: true,
            fontFamily: undefined,
            fontSize: 11,
            lineHeight: 1.1,
            color: "#fffff",
            margin: 4,
            direction: "south",
            text: (node) => node.nodeNo, // Use the nodeNo property of each node
        },
        focusring: {
            color: "darkgray",
        },
    },
        edge: {
        selectable: true,
        normal: {
            width: 3,
        },
    },
})

export default{
    nodes, layouts, edges, configs,eliminationOrderConfig
};
export type { Node, Edge };
