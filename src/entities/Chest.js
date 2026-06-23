export default class Chest {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.isOpened = false;
    }
    draw(ctx, camera) {
        ctx.fillStyle = '#ffcc00'; // Gold
        ctx.fillRect(this.x - camera.x - 25, this.y - camera.y - 25, 50, 50);
    }
}
