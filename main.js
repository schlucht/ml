import { Graph } from "./js/math/graph.js";
import { Point } from "./js/primitives/point.js";
import { Segments } from "./js/primitives/segment.js";

myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

const p1 = new Point(100, 100);
const p2 = new Point(200, 200);
const p3 = new Point(300, 300);
const p4 = new Point(400, 400);

const s1 = new Segments(p1, p2);
const s2 = new Segments(p3, p4);
const s3 = new Segments(p1, p3);
const s4 = new Segments(p2, p4);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
graph.draw(ctx)