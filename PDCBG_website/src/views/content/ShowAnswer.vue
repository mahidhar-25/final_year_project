<script lang="ts">
import { nodes, edges, layouts, configs } from "./GraphDataHelper";
import {
    parseTextDataWithoutCheck,
    checkBipartite,
    getNodeId,
} from "../FunctionHelper";
import NetworkGraph from "./NetworkGraph.vue";
import { PairedDominationInChordalNipartiteGraphs } from "../PDCBG_Class";
import { ref } from "vue";

export default {
    components: {
        NetworkGraph,
    },
    props: {
        textData: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        if (props.textData === "") return;
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
            bipartiteNode: { ...nodes.value },
            bipartiteEdges: { ...edges.value },
            bipartiteLayouts: { ...layouts.value },
            bipartiteConfigs: { ...configs.value },
            isBipartite: false,
            selectedNodes: ref<string[]>([]),
            selectedEdges: ref<string[]>([]),
        };
    },
    methods: {
        LoadcheckBipartite() {
            let g = new PairedDominationInChordalNipartiteGraphs(
                this.$props.textData
            );
            let pairedDominationEdges = g.getPairedDominationEdge();

            for (let pair of pairedDominationEdges) {
                let a: string = getNodeId(pair[0]);
                let b: string = getNodeId(pair[1]);
                console.log(a, b);

                this.selectedNodes.push(a);
                this.selectedNodes.push(b);
            }
            const {
                nodes: updatedNodes,
                edges: updatedEdges,
                isBipartite: bipartiteStatus,
                labels,
            } = checkBipartite(this.textData);
            this.bipartiteNode = updatedNodes;
            this.bipartiteEdges = updatedEdges;
            this.bipartiteLayouts = labels;
            this.isBipartite = bipartiteStatus;
            console.log(this.bipartiteNode);
        },
    },
};
</script>

<template>
    <button @click="LoadcheckBipartite">calculate answer</button>

    <div v-if="isBipartite">
        <h4>
            we calculated the paired domination edges and heighlighting them
        </h4>
        <NetworkGraph
            class="graph"
            v-model:selected-nodes="selectedNodes"
            v-model:selected-edges="selectedEdges"
            :nodes="bipartiteNode"
            :edges="bipartiteEdges"
            :layouts="bipartiteLayouts"
            :configs="bipartiteConfigs"
        />
    </div>

    <!-- <elimination-order :text-data="textData" /> -->
</template>

<style>
.graph {
    max-width: 80vw;
    height: 50vh;
    border: 1px solid #000;
}
</style>
