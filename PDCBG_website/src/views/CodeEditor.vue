<template>
    <div class="codeEditor">
        <textarea v-model="content" id="editor"></textarea>
    </div>
</template>

<script>
import * as CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/mode/javascript/javascript.js";

export default {
    name: "CodeEditor",
    props: {
        code: {
            type: String,
            required: true,
        },
    },
    mounted() {
        const editor = CodeMirror.fromTextArea(
            document.getElementById("editor"),
            {
                lineNumbers: true,
                mode: "javascript",
                readOnly: true, // Set the textarea as read-only
            }
        );

        // Make the textarea copyable
        editor.on("copy", function () {
            const selectedText = editor.getSelection();
            if (selectedText) {
                navigator.clipboard.writeText(selectedText);
                alert("Copied to clipboard: " + selectedText);
            }
        });
    },
    data() {
        return {
            content: this.code,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.codeEditor {
    width: 100%;
    max-height: 40vh;
    display: flex;

    align-items: start;
    align-content: start;
}
</style>
