<template>
    <div class="main">
        <GraphDefination />
        <CalculationSteps />
        <!-- <textarea v-model="inputText" placeholder="Enter text data"></textarea>
        <button @click="passTextData">Pass Text Data</button>
        <HomeView :textData="textDataProp" /> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GraphDefination from "./views/content/GraphDefination.vue";
import CalculationSteps from "./views/CalculationSteps.vue";
const inputText = ref("");
const textDataProp = ref("");

const passTextData = () => {
    console.log(inputText);
    textDataProp.value = inputText.value;
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
/* textarea {
    width: 100%;
    height: 100px;
    resize: vertical;
    margin-bottom: 10px;
} */

.main {
    max-width: 80vw;
    margin: 0 auto;
}
</style>
