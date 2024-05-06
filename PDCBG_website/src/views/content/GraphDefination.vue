<template>
    <div class="content">
        <h1>Graphs</h1>
        <div class="section">
            <h2>1. Graphs</h2>
            <p>
                Graphs are mathematical structures used to represent
                relationships between objects. They are widely used in computer
                science and real-world applications to model networks, social
                connections, transportation routes, and more.
            </p>
            <p>
                Real-time examples of graphs include social networks like
                Facebook (nodes are users, edges are friendships),
                transportation systems (nodes are locations, edges are roads or
                routes), and recommendation systems (nodes are items, edges are
                user preferences).
            </p>
        </div>
        <div class="section">
            <h2>2. Domination</h2>
            <p>
                Domination in graphs refers to the ability of a subset of nodes
                to control or influence the entire graph. It is important in
                various applications such as network security, where dominating
                nodes can monitor or protect the network.
            </p>
            <p>
                Domination can also be used in optimization problems to find
                efficient ways of covering or controlling a graph with minimal
                resources.
            </p>
        </div>
        <div class="section">
            <h2>3. Paired Domination</h2>
            <p>
                Paired domination is a variation of domination where nodes are
                paired together to form dominating pairs. Unlike traditional
                domination, paired domination focuses on pairs of nodes rather
                than individual nodes.
            </p>
            <p>
                It is different from domination in that it considers pairs of
                nodes working together to dominate the graph, which can have
                implications on network resilience and redundancy.
            </p>
            <p>
                Understanding paired domination is important for designing
                robust network architectures and analyzing the resilience of
                interconnected systems.
            </p>
        </div>
        <div class="section">
            <h2>4. Bipartite Graphs</h2>
            <p>
                A bipartite graph is a type of graph whose vertices can be
                divided into two disjoint sets such that no two vertices within
                the same set are adjacent. These sets are often referred to as
                the "left" and "right" sets.
            </p>
            <p>
                Bipartite graphs are used in various applications such as
                matching problems, where vertices from one set are matched with
                vertices from the other set without any conflicts or overlapping
                matches.
            </p>
        </div>
        <div class="section">
            <h2>5. Chordal Graphs</h2>
            <p>
                A chordal graph is a graph in which every cycle of four or more
                vertices has a chord, which is an edge that is not part of the
                cycle but connects two vertices of the cycle.
            </p>
            <p>
                Chordal graphs have important properties related to graph
                structure and optimization algorithms. They are used in areas
                like network design, scheduling problems, and data compression.
            </p>
        </div>
        <div class="section">
            <h2>6. Chordal Bipartite Graphs</h2>
            <p>
                A chordal bipartite graph is a combination of a bipartite graph
                and a chordal graph. It retains the properties of being
                bipartite (vertices divided into two disjoint sets) and chordal
                (every cycle of four or more vertices has a chord).
            </p>
            <p>
                Chordal bipartite graphs are studied for their structural
                properties and applications in algorithmic design. They are used
                in various domains such as network modeling, constraint
                satisfaction problems, and efficient data representation.
            </p>
        </div>
    </div>
</template>

<style>
.content {
    max-width: 80vw;
    margin: 0 auto;
}

.section {
    margin-bottom: 30px;
}

h2 {
    margin-top: 20px;
}

p {
    font-size: medium;
}
</style>

<script setup lang="ts"></script>
