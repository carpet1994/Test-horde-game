export default class Player {
    constructor(x, y) {
        this.x = x; this.y = y; this.size = 182; this.speed = 300;
    }
    update(dt, input) {
        if (input.keys['w']) this.y -= this.speed * dt;
        if (input.keys['s']) this.y += this.speed * dt;
        if (input.keys['a']) this.x -= this.speed * dt;
        if (input.keys['d']) this.x += this.speed * dt;
    }
    draw(ctx) {
        ctx.fillStyle = '#00ffcc';
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    }
}
