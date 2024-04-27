<script setup lang="ts">
import { ref, watch, defineProps, reactive, computed } from "vue";
import * as vNG from "v-network-graph";
import { parseTextData } from "./FunctionHelper";
import data from "./DataHelper";
import type { Node, Edge } from "./DataHelper";

const nodes = ref<Record<string, Node>>({ ...data.nodes });
const edges = ref<Record<string, Edge>>({ ...data.edges });
const layouts = ref({ ...data.layouts });
const configs = ref({ ...data.configs });

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
        } = parseTextData(newValue);
        nodes.value = updatedNodes;
        edges.value = updatedEdges;
        layouts.value = labels;

        console.log("nodes : ", nodes.value);
        console.log("edges : ", edges.value);
        console.log("layputs : ", layouts.value);
    }
);

const computedNodes = computed(() => nodes);
const computedEdges = computed(() => edges);
</script>

<template>
    <v-network-graph
        class="graph"
        :nodes="computedNodes"
        :edges="computedEdges"
        :layouts="layouts"
        :configs="configs"
    >
        <template #override-node-label="{ nodeId, scale, nodeNo, node }">
            <text
                x="0"
                y="0"
                :font-size="22 * scale"
                :font-weight="20"
                text-anchor="middle"
                dominant-baseline="central"
                fill="#ffffff"
                v-html="nodes[nodeId].nodeNo"
            />
            >
        </template>
    </v-network-graph>
</template>

<style>
.graph {
    width: 100vw;
    height: 50vh;
    border: 1px solid #000;
}
</style>
