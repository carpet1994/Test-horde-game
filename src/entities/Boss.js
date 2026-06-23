import { GameConfig } from '../config/GameConfig.js';

import { SpriteManager } from '../core/SpriteManager.js';

export default class Boss {
    constructor(x, y, survivalTimer) {
        this.x = x;
        this.y = y;
        this.type = 'boss';
        this.maxHp = 500 * (1 + (survivalTimer / 100));
        this.hp = this.maxHp;
        this.speed = 80;
        this.radius = 60;
        this.flash = 0;
    }

    update(dt, player) {
        if (this.flash > 0) this.flash -= dt;

        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 1) {
            this.x += (dx / dist) * this.speed * dt;
            this.y += (dy / dist) * this.speed * dt;
        }
    }

    takeDamage(amount, knockbackDir) {
        this.hp -= amount;
        this.flash = 0.1;
        this.x += knockbackDir.x * 5;
        this.y += knockbackDir.y * 5;
    }

    draw(ctx, camera) {
        const sprite = SpriteManager.cache['boss'];
        const size = this.radius * 2;

        ctx.globalAlpha = this.flash > 0 ? 0.5 : 1;
        ctx.drawImage(
            sprite,
            this.x - camera.x - size / 2,
            this.y - camera.y - size / 2,
            size,
            size
        );
        ctx.globalAlpha = 1;

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - camera.x - this.radius, this.y - camera.y - this.radius - 20, this.radius * 2, 10);
        ctx.fillStyle = 'lime';
        ctx.fillRect(
            this.x - camera.x - this.radius, 
            this.y - camera.y - this.radius - 20, 
            (this.radius * 2) * (this.hp / this.maxHp), 
            10
        );
    }
}
