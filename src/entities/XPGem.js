export default class XPGem {
    constructor(x, y, value) {
        this.x = x; this.y = y; this.value = value;
        this.radius = 10;
        this.speed = 400; // Speed when moving toward player
    }
    update(dt, player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < player.magnetRange) {
            this.x += (dx / dist) * this.speed * dt;
            this.y += (dy / dist) * this.speed * dt;
        }
    }
    draw(ctx, camera) {
        ctx.fillStyle = this.value === 1 ? '#44ccff' : (this.value === 5 ? '#44ff44' : '#ff4444');
        ctx.beginPath();
        ctx.arc(this.x - camera.x, this.y - camera.y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}
