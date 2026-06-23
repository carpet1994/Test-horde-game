import { SpriteManager } from '../core/SpriteManager.js';

export default class Chest {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 40;
    }

    draw(ctx, camera) {
        const sprite = SpriteManager.cache['chest'];
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
