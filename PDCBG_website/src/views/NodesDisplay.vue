<script setup lang="ts">
import type { Node, Edge } from "./DataHelper";
import data from "./DataHelper";

const configs = {
    ...data.configs,
    edge: {
        selectable: true,
        normal: {
            width: 3,
            color: "#4466cc",
            dasharray: "0",
            linecap: "butt",
            animate: false,
            animationSpeed: 50,
        },
        hover: {
            width: 4,
            color: "#3355bb",
            dasharray: "0",
            linecap: "butt",
            animate: false,
            animationSpeed: 50,
        },
        selected: {
            width: 3,
            color: "#dd8800",
            dasharray: "6",
            linecap: "round",
            animate: false,
            animationSpeed: 50,
        },
        gap: 5,
        type: "straight",
        margin: 2,
        marker: {
            source: {
                type: "none",
                width: 4,
                height: 4,
                margin: -1,
                offset: 0,
                units: "strokeWidth",
                color: null,
            },
            target: {
                type: "arrow",
                width: 4,
                height: 4,
                margin: -1,
                offset: 0,
                units: "strokeWidth",
                color: "black",
            },
        },
    },
};
const props = defineProps<{
    nodes: Record<string, Node>;
    edges: Record<string, Edge>;
}>();
</script>

<template>
    <v-network-graph :nodes="nodes" :edges="edges" :configs="configs" />
</template>
