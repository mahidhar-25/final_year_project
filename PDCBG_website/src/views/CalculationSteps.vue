<template>
    <div>
        <h3>Step 1 : Taking the Graph Data</h3>
        <div class="steps_explanation">
            <div class="editor">
                <CodeEditor :code="weoCode" />
            </div>
            <div class="explanation">
                <h4>Explanation :</h4>
                <p>
                    We build a graph class where we have specific function to
                    take input data .
                </p>
                <p>
                    we required n(no od nodes), m(no of edges) and follwed by
                    edges in paires
                </p>
            </div>
        </div>

        <button @click="toggleStep1TryOut" class="tryOutButton">
            {{ TextStep1 }}
        </button>
        <div v-if="enableStep1TryOut" class="steps_explanation">
            <div class="editor">
                <textarea
                    v-model="inputText"
                    class="inputTextarea"
                    placeholder="Enter text data"
                ></textarea>
            </div>
            <div class="explanation center">
                <button @click="passTextData">Load Graph</button>
            </div>
        </div>
    </div>
</template>

<script>
import CodeEditor from "./CodeEditor.vue";
import { eliminationOrderCode } from "../code.ts";
export default {
    name: "CalculationSteps",
    components: {
        CodeEditor,
    },
    data() {
        return {
            weoCode: eliminationOrderCode,
            enableStep1TryOut: false,
            TextStep1: "Try it out",
        };
    },
    methods: {
        toggleStep1TryOut() {
            this.enableStep1TryOut = !this.enableStep1TryOut;
            if (this.TextStep1 === "Try it out") {
                this.TextStep1 = "Close Demo";
            } else {
                this.TextStep1 = "Try it out";
            }
        },
    },
};
</script>
<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: row;
    height: 30vh;
}
.inputTextarea {
    resize: none;
    min-height: 30vh;
    width: 100%;
    max-width: 600px; /* Set the maximum width as per your design */
    box-sizing: border-box; /* Include padding and border in width calculation */
}

.tryOutButton {
    margin: 10px;
    margin-top: 30px;
}
.steps_explanation {
    display: flex;
    align-items: flex-start;
}

.editor {
    width: 50%; /* Adjust as needed */
    margin-right: 20px; /* Adjust spacing between editor and explanation */
}

.explanation {
    width: 50%; /* Adjust as needed */
}

/* Optional: Style for CodeEditor component */
.CodeMirror {
    height: 200px; /* Set the desired height for the CodeEditor */
    border: 1px solid #ccc;
    border-radius: 4px;
}

.explanation h4 {
    margin-bottom: 10px;
}

.explanation p {
    margin-bottom: 5px;
}
</style>
