<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { checkBipartite, parseTextDataWithoutCheck } from "./FunctionHelper";
import data from "./DataHelper";
import type { Node, Edge } from "./DataHelper";
import { createNodeObject, getNodeId } from "./FunctionHelper";
import { Graph } from "./PDCBG_Class";
import NodesDisplay from "./NodesDisplay.vue";

const nodes = ref<Record<string, Node>>({ ...data.nodes });
const edges = ref<Record<string, Edge>>({ ...data.edges });
const EliminationOrderNodes = ref<Record<string, Node>>({});
const EliminationOrderEdges = ref<Record<string, Edge>>({});
const layouts = ref({ ...data.layouts });
const configs = ref({
    ...data.eliminationOrderConfig,
});
const nextNodeIndex = ref(Object.keys(nodes).length + 1);
const nextEdgeIndex = ref(Object.keys(edges).length + 1);
const selectedNodes = ref<string[]>([]);
const selectedEdges = ref<string[]>([]);
const EliminationOrder: string[] = [];
let prevNodeId: string = "";
let currentIteration: number = 0;

const props = defineProps<{
    textData: string;
}>();

// Watch for changes in the textData prop
watch(
    () => props.textData,
    (newValue) => {
        console.log(newValue);
        const {
            nodes: updatedNodes,
            edges: updatedEdges,
            labels,
        } = checkBipartite(newValue);
        nodes.value = updatedNodes;
        edges.value = updatedEdges;
        layouts.value = labels;
        let g = new Graph();
        g.takeGraphData(newValue);
        let weo: number[] = g.getWeakEliminationOrder();
        for (let num of weo) {
            EliminationOrder.push(getNodeId(num));
        }

        console.log(configs.value);
        console.log("selected nodes : ", EliminationOrder);
    }
);

const computedNodes = computed(() => nodes);
const computedEdges = computed(() => edges);

// Function to add a node
function addNode() {
    const nodeId = getNodeId(nextNodeIndex.value);
    nodes.value[nodeId] = createNodeObject(nextNodeIndex.value);
    nextNodeIndex.value++;
}

// Function to remove a node
function removeNode() {
    for (const nodeId of selectedNodes.value) {
        currentIteration++;
        const nodeObj = nodes.value[nodeId];
        delete nodes.value[nodeId];
        removeEdgesByNode(nodeId); // Remove edges when a node is deleted
        EliminationOrderNodes.value[nodeId] = nodeObj;
        if (prevNodeId !== "") {
            const edgeKey = `edge${currentIteration}`;
            EliminationOrderEdges.value[edgeKey] = {
                source: prevNodeId,
                target: nodeId,
            };
        }
        prevNodeId = nodeId;
    }
}

// Function to add an edge
function addEdge() {
    if (selectedNodes.value.length !== 2) return;
    const [source, target] = selectedNodes.value;
    const edgeId = `edge${nextEdgeIndex.value}`;
    edges.value[edgeId] = {
        source,
        target,
        width: undefined,
        color: undefined,
        dashed: undefined,
    };
    nextEdgeIndex.value++;
}

// Function to remove an edge
function removeEdge() {
    for (const edgeId of selectedEdges.value) {
        delete edges.value[edgeId];
    }
}

// Function to remove edges corresponding to a node
function removeEdgesByNode(nodeId: string) {
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
}
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// Function to automate node selection and removal with delay
async function automateNodeRemoval() {
    if (EliminationOrder.length <= 0) return; // Check if nodes array is empty

    for (let Element in EliminationOrder) {
        selectedNodes.value = [EliminationOrder[Element]];
        setTimeout(() => {
            removeNode();
        }, 500);
        await sleep(1000);
    }
}

async function removeEdgesAndMove() {
    await automateNodeRemoval();
}
</script>

<template>
    <b>Weak Elimination Order</b>
    <div>
        <button @click="automateNodeRemoval" class="button">Automate</button>
        <button @click="removeNode" class="button">Next Step</button>
    </div>

    <v-network-graph
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

<style>
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
