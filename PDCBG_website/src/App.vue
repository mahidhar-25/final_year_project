<template>
    <div>
        <textarea v-model="inputText" placeholder="Enter text data"></textarea>
        <button @click="passTextData">Pass Text Data</button>
        <HomeView :textData="textDataProp" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HomeView from "./views/HomeView.vue";

const inputText = ref("");
const textDataProp = ref("");

const passTextData = () => {
    console.log(inputText);
    textDataProp.value = inputText.value;
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
textarea {
    width: 100%;
    height: 100px;
    resize: vertical;
    margin-bottom: 10px;
}
</style>
