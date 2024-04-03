import { Point } from "./primitives/point.js"
import { Segments } from "./primitives/segment.js"
import { getNearestPoint } from "./math/utils.js"


class GraphEditor {
    constructor(viewport, graph) {
        this.viewport = viewport
        this.canvas = viewport.canvas        
        this.graph = graph

        this.ctx = this.canvas.getContext("2d")

        this.mouse = null
        this.hovered = null
        this.dragging = false
        this.selected = null

        this. #addEventListeners();

    }

    #addEventListeners() {
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this))
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this))
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())
        this.canvas.addEventListener("mouseup", (e) => () => this.dragging = false)
    }

    #handleMouseMove(e) {
       this.mouse = new Point(e.offsetX, e.offsetY);
       
       this.hovered = getNearestPoint(this.mouse, this.graph.points, 10)

       if (this.dragging == true) {        
            this.selected.x = this.mouse.x
            this.selected.y = this.mouse.y
       }

    }

    #handleMouseDown(e) {
        if (e.button == 2) {
            if (this.selected) {
                this.selected = null
            } else if (this.hovered) {
                this.#removePoint(this.hovered)
            }
        }
        if (e.button == 0) {
            if (this.hovered) {
                this.#select(this.hovered)
                this.dragging = true
                return
            }
            this.graph.addPoint(this.mouse)
            this.#select(this.mouse)
            this.hovered = this.mouse
        }
    }

    #select(point){
        if (this.selected) {
            this.graph.tryAddSegment(new Segments(this.selected, point))
        }
        this.selected = point
    }

    #removePoint(point) {
        this.graph.removePoint(point)
        this.hovered = null
        if (this.selected == point) {
            this.selected = null
        }
    }

        /**
     * Display the graph and any hovered or selected elements on the canvas.
     */    
    display() {
        this.graph.draw(this.ctx)
        if (this.hovered) {
            this.hovered.draw(this.ctx, {fill: true})
        }
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse
            new Segments(this.selected, intent).draw(this.ctx, { dash: [3, 3]})
            this.selected.draw(this.ctx, {outline: true})
        }
    }
}

export { GraphEditor }