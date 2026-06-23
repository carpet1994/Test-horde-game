import { SpriteManager } from '../core/SpriteManager.js';

export default class XPGem {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.radius = 15;
    }

    update(dt, player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < player.magnetRange) {
            this.x += (dx / dist) * 600 * dt;
            this.y += (dy / dist) * 600 * dt;
        }
    }

    draw(ctx, camera) {
        const sprite = SpriteManager.cache['gem'];
        const size = this.radius * 2;
        ctx.drawImage(
            sprite,
            this.x - camera.x - size / 2,
            this.y - camera.y - size / 2,
            size,
            size
        );
    }
}
