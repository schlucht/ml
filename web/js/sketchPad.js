/**
 * Create the sketchpad.
 */
class SketchPad {
  /**
   * @constructor
   * @param {HTMLDivElement} container HMTL Container Element
   * @param {number} size Size of the canvas
   */
  constructor(container, size = 400) {
    this.paths = [];
    this.isDrawing = false;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = size;
    this.canvas.width = size;
    this.canvas.style = `
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 1);
        `;

    container.appendChild(this.canvas);
    const lineBreak = document.createElement("br");
    container.appendChild(lineBreak);

    this.undoBtn = document.createElement("button");
    this.undoBtn.innerHTML = "UNDO";
    this.undoBtn.disabled = true;
    container.appendChild(this.undoBtn);

    this.clearBtn = document.createElement("button");
    this.clearBtn.innerHTML = "CLEAR";
    this.clearBtn.classList.add("clear");
    this.clearBtn.disabled = true;
    container.appendChild(this.clearBtn);

    this.reset();
    this.#addEventListeners();
  }

  /**
   * Add all event listeners to the canvas.
   */
  #addEventListeners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(evt);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw();
      }
    };

    document.onmouseup = () => {
      this.isDrawing = false;
    };

    this.canvas.ontouchstart = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmousedown(loc);
    };

    this.canvas.ontouchmove = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmousemove(loc);
    };

    document.ontouchend = () => {
      document.onmouseup();
    };

    this.undoBtn.onclick = () => {
      this.paths.pop();
      this.#redraw();
    };

    this.clearBtn.onclick = () => this.reset();
  }

  /**
   * Get the mouse position.
   * @param {MouseEvent} evt Mouse Event
   */
  #getMouse = (evt) => {
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  };

  /**
   * Redraw the canvas.
   */
  #redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.paths.length > 0) {
      draw.paths(this.ctx, this.paths);
    }
    this.undoBtn.disabled = this.paths.length < 1;
    this.clearBtn.disabled = this.paths.length < 1;
  }

  reset() {
    this.paths = [];
    this.isDrawing = false;
    this.#redraw();
  }
}
