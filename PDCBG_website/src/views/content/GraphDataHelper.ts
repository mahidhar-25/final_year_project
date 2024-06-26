// GraphDataHelper.ts
import { ref } from "vue";
import { parseTextDataWithoutCheck } from "../FunctionHelper";
import data from "../DataHelper";
import type { Node, Edge } from "../DataHelper";

export let nodes = ref<Record<string, Node>>({ ...data.nodes });
export let edges = ref<Record<string, Edge>>({ ...data.edges });
export let layouts = ref({ ...data.layouts });
export let configs = ref({ ...data.configs });

export function updateGraphData(textData: string) {
    const { nodes: updatedNodes, edges: updatedEdges, labels } = parseTextDataWithoutCheck(textData);
    nodes.value = updatedNodes;
    edges.value = updatedEdges;
    layouts.value = labels;
}
