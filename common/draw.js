const draw = {};

/**
 * Draw one path.
 * @param {CanvasRenderingContext2D} ctx Canvas Context
 * @param {Array<Array<number>>} path Path
 * @param {string} [color=black] color Color of the stroke
 * @param {number} [width=3] Width of the stroke
 */
draw.path = (ctx, path, color = "black", width = 3) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(...path[0]);
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(...path[i]);
  }
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
};

/**
 * Draw more paths.
 * @param {CanvasRenderingContext2D} ctx Canvas Context
 * @param {Array<Array<Array<number>>>} paths Paths
 * @param {string} [color=black] color Color of the stroke
 * @param {number} [width=3] Width of the stroke
 */
draw.paths = (ctx, paths, color = "black", width = 3) => {
  for (const path of paths) {
    draw.path(ctx, path, color, width);
  }
};

if (typeof module !== "undefined") {
  module.exports = draw;
}
