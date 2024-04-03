class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    
    equals(point) {
        return this.x == point.x && this.y == point.y
    }

    draw(ctx, size=10, color="black") {
        const rad = size / 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}

export { Point };