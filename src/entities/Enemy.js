export default class Enemy {
    constructor(x, y, type) {
        this.x = x; this.y = y; this.type = type;
        this.speed = type === 'slime' ? 150 : 250;
        this.hp = type === 'slime' ? 3 : 1;
        this.size = 60; // Visual size smaller than source 182
    }
    update(dt, player) {
        let dx = player.x - this.x;
        let dy = player.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        this.x += (dx / dist) * this.speed * dt;
        this.y += (dy / dist) * this.speed * dt;
    }
    draw(ctx, camera) {
        ctx.fillStyle = this.type === 'slime' ? '#77ff77' : '#ff7777';
        ctx.fillRect(this.x - camera.x - this.size/2, this.y - camera.y - this.size/2, this.size, this.size);
    }
}
