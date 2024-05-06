<template>
    <b>Weak Elimination Order</b>
    <div>
        <button @click="automateNodeRemoval" class="button">Automate</button>
        <button @click="removeNode" class="button">Next Step</button>
    </div>

    <v-network-graph
        v-if="isGraphEnable"
        v-model:selected-nodes="selectedNodes"
        v-model:selected-edges="selectedEdges"
        :nodes="nodes"
        :edges="edges"
        :layouts="layouts"
        :configs="configs"
        class="graph"
    />

    <nodes-display
        class="graph"
        :nodes="EliminationOrderNodes"
        :edges="EliminationOrderEdges"
    />
</template>
<script lang="ts">
import { checkBipartite, getNodeId, createNodeObject } from "./FunctionHelper";
import { nodes, edges, layouts, configs } from "./content/GraphDataHelper";
import data from "./DataHelper";
import type { Node, Edge } from "./DataHelper";
import { Graph } from "./PDCBG_Class";
import NodesDisplay from "./NodesDisplay.vue";
import { ref } from "vue";
export default {
    components: {
        NodesDisplay,
    },

    props: {
        textData: {
            type: String,
            required: true,
        },
    },

    methods: {
        addNode() {
            const nodeId = getNodeId(this.nextNodeIndex);
            nodes.value[nodeId] = createNodeObject(this.nextNodeIndex);
            this.nextNodeIndex++;
        },

        // Function to remove a node
        removeNode() {
            for (const nodeId of this.selectedNodes) {
                this.currentIteration++;
                const nodeObj = nodes.value[nodeId];
                delete nodes.value[nodeId];
                this.removeEdgesByNode(nodeId); // Remove edges when a node is deleted
                this.EliminationOrderNodes[nodeId] = nodeObj;
                if (this.prevNodeId !== "") {
                    const edgeKey = `edge${this.currentIteration}`;
                    this.EliminationOrderEdges[edgeKey] = {
                        source: this.prevNodeId,
                        target: nodeId,
                    };
                }
                this.prevNodeId = nodeId;
            }
        },

        // Function to add an edge
        addEdge() {
            if (this.selectedNodes.length !== 2) return;
            const [source, target] = this.selectedNodes;
            const edgeId = `edge${this.nextEdgeIndex}`;
            edges.value[edgeId] = {
                source,
                target,
                width: undefined,
                color: undefined,
                dashed: undefined,
            };
            this.nextEdgeIndex++;
        },

        // Function to remove an edge
        removeEdge() {
            for (const edgeId of this.selectedEdges) {
                delete edges.value[edgeId];
            }
        },

        // Function to remove edges corresponding to a node
        removeEdgesByNode(nodeId: string) {
            console.log(edges.value);
            for (const edgeId in edges.value) {
                console.log(edgeId);
                if (
                    edges.value[edgeId].source === nodeId ||
                    edges.value[edgeId].target === nodeId
                ) {
                    delete edges.value[edgeId];
                }
            }
        },
        sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        // Function to automate node selection and removal with delay
        async automateNodeRemoval() {
            let g = new Graph();
            g.takeGraphData(this.textData);
            let weo: number[] = g.getWeakEliminationOrder();
            for (let num of weo) {
                this.EliminationOrder.push(getNodeId(num));
            }

            if (this.EliminationOrder.length <= 0) return; // Check if nodes array is empty

            for (let Element in this.EliminationOrder) {
                this.selectedNodes = [this.EliminationOrder[Element]];
                setTimeout(() => {
                    this.removeNode();
                }, 500);
                await this.sleep(1000);
            }

            this.isGraphEnable = false;
        },

        async removeEdgesAndMove() {
            await this.automateNodeRemoval();
        },
    },

    setup(props) {
        const {
            nodes: updatedNodes,
            edges: updatedEdges,
            labels,
        } = checkBipartite(props.textData);
        nodes.value = updatedNodes;
        edges.value = updatedEdges;
        layouts.value = labels;
        return {
            nodes,
            edges,
            layouts,
            configs,
        };
    },

    data() {
        return {
            EliminationOrderNodes: ref<Record<string, Node>>({}),
            EliminationOrderEdges: ref<Record<string, Edge>>({}),
            configs: ref({ ...data.eliminationOrderConfig }),
            nextNodeIndex: ref(Object.keys(nodes).length + 1),
            nextEdgeIndex: ref(Object.keys(edges).length + 1),
            selectedNodes: ref<string[]>([]),
            selectedEdges: ref<string[]>([]),
            EliminationOrder: ref<string[]>([]),
            prevNodeId: "",
            currentIteration: 0,
            isGraphEnable: true,
        };
    },
};
</script>

<style scoped>
.graph {
    margin-top: 20px;
    width: 100vw;
    height: 50vh;
    border: 1px solid #000;
}

.button {
    margin: 5px;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
    text-align: center;
    background-color: rgb(164, 232, 75);
    border-radius: 25%;
}
</style>
