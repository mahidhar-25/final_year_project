<template>
    <v-network-graph
        class="graph"
        :nodes="props.nodes"
        :edges="props.edges"
        :layouts="props.layouts"
        :configs="props.configs"
    >
        <template #override-node-label="{ nodeId, scale }">
            <text
                x="0"
                y="0"
                :font-size="22 * scale"
                :font-weight="20"
                text-anchor="middle"
                dominant-baseline="central"
                fill="#ffffff"
                v-html="props.nodes[nodeId].nodeNo"
            />
            >
        </template>
    </v-network-graph>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    nodes: Record<string, any>;
    edges: Record<string, any>;
    layouts: Record<string, any>;
    configs: Record<string, any>;
}>();
</script>

<style scoped>
.graph {
    max-width: 80vw;
    height: 50vh;
    border: 1px solid #000;
}
</style>
