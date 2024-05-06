<script lang="ts">
import { nodes, edges, layouts, configs } from "./GraphDataHelper";
import { parseTextDataWithoutCheck, checkBipartite } from "../FunctionHelper";
import NetworkGraph from "./NetworkGraph.vue";

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
        const {
            nodes: updatedNodes,
            edges: updatedEdges,
            labels,
        } = parseTextDataWithoutCheck(props.textData);
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
        };
    },
    methods: {
        LoadcheckBipartite() {
            const {
                nodes: updatedNodes,
                edges: updatedEdges,
                isBipartite: bipartiteStatus,
            } = checkBipartite(this.textData);
            this.bipartiteNode = updatedNodes;
            this.bipartiteEdges = updatedEdges;
            this.isBipartite = bipartiteStatus;
            console.log(this.bipartiteNode);
        },
    },
};
</script>

<template>
    <h3>Graph is generated</h3>
    <NetworkGraph
        id="step1GraphData"
        class="graph"
        :nodes="nodes"
        :edges="edges"
        :layouts="layouts"
        :configs="configs"
    />
    <button @click="LoadcheckBipartite">CheckBipartite</button>

    <div v-if="isBipartite">
        <h4>Graph is Bipartite and Colors are updated</h4>
        <NetworkGraph
            class="graph"
            :nodes="bipartiteNode"
            :edges="bipartiteEdges"
            :layouts="layouts"
            :configs="bipartiteConfigs"
        />
    </div>
    <div v-else>
        <h4>Graph is not Bipartite</h4>
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
