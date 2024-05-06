import { Ref } from 'vue';
import { Node, Edge } from '../DataHelper';

export const nodes: Ref<Record<string, Node>>;
export const edges: Ref<Record<string, Edge>>;
export const layouts: Ref<any>; // Adjust the type as needed
export const configs: Ref<any>; // Adjust the type as needed

export function updateGraphData(textData: string): void;
