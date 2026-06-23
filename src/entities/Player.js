import { GameConfig } from '../config/GameConfig.js';
export default class Player {
    constructor(x, y) {
        this.x = x; this.y = y; this.hp = 100; this.maxHp = 100;
        this.xp = 0; this.level = 1; this.xpRequired = 10;
        this.magnetRange = GameConfig.player.magnetRange;
    }
    addXP(val) { this.xp += val; }
    checkLevelUp() {
        if (this.xp >= this.xpRequired) {
            this.level++;
            this.xp -= this.xpRequired;
            this.xpRequired *= 1.5;
            return true;
        }
        return false;
    }
    update(dt, input) { /* Movement logic */ }
    draw(ctx, cam) { /* Render logic */ }
}
