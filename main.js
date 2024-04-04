import { Graph } from "./js/math/graph.js";
import { World } from "./js/world.js";
import { Viewport } from "./js/viewport.js";
import { GraphEditor } from "./js/graphEditor.js";

myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo
    ? Graph.load(graphInfo)
    : new Graph();
const world = new World(graph);

const viewport = new Viewport(myCanvas);
const graphEditor = new GraphEditor(viewport, graph);

let oldGraphHash = graph.hash();
animate();

function animate() {
    viewport.reset();
    if (graph.hash() != oldGraphHash) {
        world.generate();
        oldGraphHash = graph.hash();
    }
    world.draw(ctx);
    ctx.globalAlpha = 0.3;
    graphEditor.display();
    requestAnimationFrame(animate);
}

document.getElementById("dispose").onclick = dispose;
document.getElementById("save").onclick = save;

function dispose() {
    graphEditor.dispose();
}

function save() {
    localStorage.setItem("graph", JSON.stringify(graph));
}