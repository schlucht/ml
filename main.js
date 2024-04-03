import { Graph } from "./js/math/graph.js";
import { Point } from "./js/primitives/point.js";
import { Segments } from "./js/primitives/segment.js";
import { GraphEditor } from "./js/graphEditor.js";
import { Viewport } from "./js/viewport.js";
import { World } from "./js/world.js";

myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

const graphString = localStorage.getItem("graph")
const graphInfo = graphString ? JSON.parse(graphString) : null
const graph = graphInfo ? Graph.load(grapInfo) : new Graph()
const world = new World(graph)
const viewport = new Viewport(myCanvas)
const graphEditor = new GraphEditor(viewport, graph)

animate()

function animate() {
    viewport.reset()
   world.generate()
   world.draw(ctx)
   ctx.globalAlpha = 0.3
    graphEditor.display()
    requestAnimationFrame(animate)
}

function dispose() {
    graphEditor.dispose()
}
function save() {
    localStorage.setItem("graph", JSON.stringify(graph))
}
