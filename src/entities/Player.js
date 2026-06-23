export default class Player {
    constructor(x, y) {
        this.x = x; this.y = y; this.size = 182; this.speed = 400;
        this.hp = 100; this.maxHp = 100;
        this.invincible = 0; // i-frame timer
    }
    takeDamage(amount) {
        if (this.invincible > 0) return;
        this.hp -= amount;
        this.invincible = 1.0; // 1 second i-frames
    }
    update(dt) {
        if (this.invincible > 0) this.invincible -= dt;
        // ... movement logic ...
    }
    draw(ctx, camera) {
        // Flash if invincible
        ctx.globalAlpha = (this.invincible > 0 && Math.floor(Date.now() / 100) % 2) ? 0.5 : 1.0;
        ctx.fillStyle = '#00ffcc';
        ctx.fillRect(this.x - camera.x - 40, this.y - camera.y - 40, 80, 80);
        ctx.globalAlpha = 1.0;
        // Health Bar
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - camera.x - 40, this.y - camera.y - 60, 80, 10);
        ctx.fillStyle = 'lime';
        ctx.fillRect(this.x - camera.x - 40, this.y - camera.y - 60, 80 * (this.hp/this.maxHp), 10);
    }
}
