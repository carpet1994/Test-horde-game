export default class Player {
    constructor(x, y) {
        this.x = x; this.y = y; this.size = 182; this.speed = 400;
        this.lastShot = 0;
    }
    update(dt, input) {
        if (input.keys['w'] || input.keys['ArrowUp']) this.y -= this.speed * dt;
        if (input.keys['s'] || input.keys['ArrowDown']) this.y += this.speed * dt;
        if (input.keys['a'] || input.keys['ArrowLeft']) this.x -= this.speed * dt;
        if (input.keys['d'] || input.keys['ArrowRight']) this.x += this.speed * dt;
    }
    draw(ctx, camera) {
        ctx.fillStyle = '#00ffcc';
        ctx.fillRect(this.x - camera.x - this.size/4, this.y - camera.y - this.size/4, this.size/2, this.size/2);
    }
}
