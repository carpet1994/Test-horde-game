import { GameConfig } from '../config/GameConfig.js';

export default class Enemy {
    constructor(x, y, type) {
        this.x = x; this.y = y;
        this.type = type;
        this.stats = GameConfig.enemies[type];
        this.hp = this.stats.hp;
        this.maxHp = this.stats.hp;
        this.radius = 30;
        this.flash = 0;
    }
    update(dt, player) {
        if (this.flash > 0) this.flash -= dt;
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);
        this.x += (dx / dist) * this.stats.speed * dt;
        this.y += (dy / dist) * this.stats.speed * dt;
    }
    draw(ctx, camera) {
        ctx.fillStyle = this.flash > 0 ? 'white' : this.stats.color;
        ctx.fillRect(this.x - camera.x - this.radius, this.y - camera.y - this.radius, this.radius * 2, this.radius * 2);
    }
}
