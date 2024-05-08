<template>
    <div class="main">
        <GraphDefination />
        <CalculationSteps />
    </div>
</template>

<script setup lang="ts">
import GraphDefination from "./views/content/GraphDefination.vue";
import CalculationSteps from "./views/CalculationSteps.vue";
</script>

<style>
.main {
    max-width: 80vw;
    margin: 0 auto;
}
</style>
