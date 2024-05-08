<template>
    <div>
        <div>
            <h3>Step 1 : Taking the Graph Data</h3>
            <div class="steps_explanation">
                <div class="editor">
                    <CodeEditor :code="graphData" propid="step1" />
                </div>
                <div class="explanation">
                    <h4>Explanation :</h4>
                    <p>
                        we declare class graph which keep tracks of the graph
                        data and its properties like order , degree edges nodes.
                        user should give an input in the order of
                    </p>
                    <p>line 1 : no of nodes - <b>n</b></p>
                    <p>line 2 : no of edges - <b>m</b></p>
                    <p>line (3-n+2) : source node , target nodes -> edges</p>

                    <p>
                        <b>Note </b>: for visual experience use try out option
                        below and give some input
                    </p>
                </div>
            </div>

            <button @click="toggleStep1TryOut" class="tryOutButton">
                {{ TextStep1 }}
            </button>
            <div v-if="enableStep1TryOut" class="steps_explanation">
                <div class="editor">
                    <textarea
                        v-model="inputTextData"
                        class="inputTextarea"
                        placeholder="Enter text data"
                    ></textarea>
                </div>
                <div class="explanation center">
                    <button @click="passTextData">Load Graph</button>
                </div>
            </div>

            <div v-if="showGraphEnable">
                <LoadGraph :textData="inputTextData" />
            </div>
        </div>
        <div>
            <h3>Step 2 : Calculating the weak elimination order</h3>
            <div class="steps_explanation">
                <div class="editor">
                    <CodeEditor :code="weoCode" propid="step2" />
                </div>
                <div class="explanation">
                    <h4>Explanation :</h4>
                    <p>
                        <b>Initialize Variables</b>: if no of nodes(n) > 0 then
                        we intialize degree vector and elimination order vector
                    </p>
                    <p>
                        <b>Fill Priority Queue</b>: The function then fills the
                        priority queue with pairs of degrees and node indices
                        for all nodes in the graph. The priority queue is
                        ordered in ascending order of degrees.
                    </p>
                    <p>
                        <b>Find Weak Elimination Order</b>: The function enters
                        a loop that continues until the priority queue is empty.
                        In each iteration, it
                    </p>
                    <ul>
                        <li>
                            Removes the pair with the smallest degree from the
                            priority queue.
                        </li>
                        <li>
                            Checks if the node has been visited. If it has, it
                            continues to the next iteration. Marks the node as
                            visited and adds it to the order vector.
                        </li>
                        <li>
                            Decreases the degree of all unvisited neighbors of
                            the node in the temp_degree vector and adds them to
                            the priority queue.
                        </li>
                    </ul>
                </div>
            </div>

            <button @click="toggleStep2TryOut" class="tryOutButton">
                {{ TextStep2 }}
            </button>
            <div v-if="enableStep1TryOut && enableStep2TryOut">
                <button @click="enableEliminationOrder">WEO Animation</button>

                <div v-if="eliminationOrderAnimation">
                    <EliminationOrder :textData="inputTextData" />
                </div>
            </div>
        </div>

        <div>
            <h3>Step3 : To calculate paired domination sets</h3>
            <h4></h4>
            <div class="steps_explanation margin">
                <div class="editor">
                    <CodeEditor :code="PDCBG_CLASS_data" propid="step3.1" />
                </div>
                <div class="explanation">
                    <h4>Explanation :</h4>
                    <p>
                        we created class PDICBG for keep track of paired
                        domination of graph which used above graph class.
                    </p>
                    <p>
                        <b>constructor</b> : we have a constructor which takies
                        the input of nodes and edges and initiate all the
                        predefined helper functions
                    </p>
                    <p>
                        <b>helper functions </b>: for faster calculation we
                        calcuate some varaibles at the time of creation like
                        order of nodes , sorting the neighbours based on the
                        degree , resizing the sizes , and getting the
                        elimination order from step2
                    </p>
                </div>
            </div>

            <div class="steps_explanation margin">
                <div class="editor">
                    <CodeEditor :code="t_s_functionCode" propid="step3.2" />
                </div>
                <div class="explanation">
                    <h4>Explanation :</h4>
                    <p>
                        <b>calculateTAndSFunction()</b> function is used to
                        calculate two sets of vertices, tFunction and sFunction
                    </p>
                    <ul>
                        <li>
                            <b>Clear Previous Values</b>: The function starts by
                            clearing any previous values in tFunction and
                            sFunction.
                        </li>
                        <li>
                            <b>Iterate Over Neighbors</b>: The function then
                            iterates over the neighbors of the currentVertex in
                            the sortedNeighboursList.
                        </li>
                        <li>
                            <b>Calculate tFunction</b>: For each neighbor c, if
                            c is not visited, L[c] is 1, and the degree of c in
                            the graph CBG is 1, then c is added to tFunction.
                            This means tFunction will contain all unvisited
                            neighbors of currentVertex that have a degree of 1
                            in the graph and for which L[c] is 1.
                        </li>
                        <li>
                            <b>Calculate sFunction</b>: If the order of c is
                            greater than i and L[c] is 1, then c is added to
                            sFunction. This means sFunction will contain all
                            neighbors of currentVertex that have an order
                            greater than i and for which L[c] is 1.
                        </li>
                    </ul>
                </div>
            </div>

            <div class="steps_explanation margin">
                <div class="editor">
                    <CodeEditor :code="vertexStatusCode" propid="step3.3" />
                </div>
                <div class="explanation">
                    <h4>Explanation :</h4>
                    <p>
                        <b>noVertexWithDegreeWithD(int i)</b>: This function
                        checks if there exists a neighbor of the ith node in the
                        elimination order that has not been visited, has a
                        degree of 1 in the graph, and for which D[c] is 0. If
                        such a node exists, the function returns true;
                        otherwise, it returns false.
                    </p>
                    <p>
                        <b>noVertexWithDegree(int i)</b>: This function is
                        similar to the previous one, but it only checks for
                        neighbors that have not been visited and have a degree
                        of 1 in the graph. If such a node exists, the function
                        returns true; otherwise, it returns false
                    </p>
                </div>
            </div>
            <div class="steps_explanation margin">
                <div class="editor">
                    <CodeEditor :code="updateVertexStatus" propid="step3.4" />
                </div>
                <div class="explanation">
                    <h4>Explanation :</h4>
                    <p>
                        <strong>markNeighboursCovered(int vertex)</strong>: This
                        function is used to mark all the neighbors of a given
                        vertex as covered in the graph.
                    </p>

                    <ol>
                        <li>
                            It starts by iterating over the neighbors of the
                            given vertex in the
                            <strong>sortedNeighboursList</strong>.
                        </li>
                        <li>
                            For each neighbor <strong>c</strong>, it sets the
                            corresponding element in the
                            <strong>D</strong> vector to 1, indicating that the
                            neighbor is covered.
                        </li>
                    </ol>

                    <p>
                        <strong
                            >makePairedDominationEdge(int vertex1, int
                            vertex2)</strong
                        >: This function is used to create a paired domination
                        edge between two given vertices and add it to the
                        <strong>pairedDominationEdge</strong> set.
                    </p>

                    <ol>
                        <li>
                            It starts by setting the corresponding elements in
                            the <strong>L</strong> vector for both vertices to
                            2, indicating that they are part of a paired
                            domination edge.
                        </li>
                        <li>
                            Then, it adds the pair of vertices to the
                            <strong>pairedDominationEdge</strong> set.
                        </li>
                    </ol>
                </div>
            </div>
            <div class="steps_explanation margin">
                <div class="editor">
                    <CodeEditor :code="backTestCode" propid="step3.5" />
                </div>
                <div class="explanation">
                    <h4>Explanation :</h4>
                    <p>
                        The <strong>backTestPairedDomination</strong> function
                        is used to verify if the paired domination edge set
                        covers all the nodes in the graph.
                    </p>

                    <ol>
                        <li>
                            It starts by initializing a
                            <strong>covered</strong> vector of size equal to the
                            number of nodes in the graph, with all elements set
                            to 0.
                        </li>
                        <li>
                            Then, it iterates over each edge in the
                            <strong>pairedDominationEdge</strong> set. For each
                            edge, it iterates over both vertices of the edge.
                            For each vertex, it iterates over its neighbors in
                            the <strong>sortedNeighboursList</strong> and marks
                            them as covered by setting the corresponding element
                            in the <strong>covered</strong> vector to 1.
                        </li>
                        <li>
                            Finally, it checks if all nodes in the graph are
                            covered by iterating over the
                            <strong>covered</strong> vector. If it finds a node
                            that is not covered (i.e., an element in the
                            <strong>covered</strong> vector is 0), it returns
                            <strong>false</strong>. If all nodes are covered, it
                            returns <strong>true</strong>.
                        </li>
                    </ol>

                    <p>
                        In summary, this function checks if the paired
                        domination edge set forms a valid paired dominating set
                        for the graph.
                    </p>
                </div>
            </div>

            <div class="steps_explanation margin">
                <div class="editor">
                    <CodeEditor
                        :code="mainPDCBGCode"
                        propid="step3.6"
                        ediotrHeight="full"
                    />
                </div>
                <div class="explanation">
                    <div>
                        <img src="../assets/algo_explanation_part1.png" />
                    </div>
                    <div>
                        <img src="../assets/algo_explanation_part2.png" />
                    </div>
                </div>
            </div>

            <div>
                <ShowAnswer :textData="inputTextData" />
            </div>
        </div>
    </div>
</template>

<script>
import CodeEditor from "./CodeEditor.vue";
import LoadGraph from "./content/LoadGraph.vue";
import ShowAnswer from "./content/ShowAnswer.vue";
import {
    eliminationOrderCode,
    takeGraphDataCode,
    PDCBG_CLASS,
    TandSfunctionCode,
    getVertexNodesStatus,
    updateVertexStatus,
    backTestCode,
    mainPDCBGCode,
} from "../code.ts";
import EliminationOrder from "./EliminationOrder.vue";
export default {
    name: "CalculationSteps",
    components: {
        CodeEditor,
        LoadGraph,
        EliminationOrder,
        ShowAnswer,
    },
    data() {
        return {
            graphData: takeGraphDataCode,
            weoCode: eliminationOrderCode,
            enableStep1TryOut: false,
            TextStep1: "Try it out",
            enableStep2TryOut: false,
            TextStep2: "Try it out",
            inputTextData: "",
            showGraphEnable: false,
            eliminationOrderAnimation: false,
            PDCBG_CLASS_data: PDCBG_CLASS,
            t_s_functionCode: TandSfunctionCode,
            vertexStatusCode: getVertexNodesStatus,
            updateVertexStatus: updateVertexStatus,
            backTestCode: backTestCode,
            mainPDCBGCode: mainPDCBGCode,
        };
    },
    methods: {
        enableEliminationOrder() {
            this.eliminationOrderAnimation = !this.eliminationOrderAnimation;
        },
        toggleStep1TryOut() {
            this.enableStep1TryOut = !this.enableStep1TryOut;
            if (this.TextStep1 === "Try it out") {
                this.TextStep1 = "Close Demo";
            } else {
                this.TextStep1 = "Try it out";
            }
        },

        toggleStep2TryOut() {
            this.enableStep2TryOut = !this.enableStep2TryOut;
            if (this.TextStep2 === "Try it out") {
                this.TextStep2 = "Close Demo";
            } else {
                this.TextStep2 = "Try it out";
            }
        },
        passTextData() {
            this.showGraphEnable = !this.showGraphEnable;
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

.margin {
    margin: 20px;
}
</style>
