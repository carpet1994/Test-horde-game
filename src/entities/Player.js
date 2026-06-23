import { GameConfig } from '../config/GameConfig.js';

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hp = GameConfig.player.hp;
        this.maxHp = GameConfig.player.hp;
        this.speed = GameConfig.player.speed;
        this.xp = 0;
        this.level = 1;
        this.xpRequired = 10;
        this.magnetRange = GameConfig.player.magnetRange;
        this.passives = {};
    }

    addXP(val) {
        this.xp += val;
    }

    checkLevelUp() {
        if (this.xp >= this.xpRequired) {
            this.level++;
            this.xp -= this.xpRequired;
            this.xpRequired = Math.floor(this.xpRequired * 1.5);
            return true;
        }
        return false;
    }

    addPassive(id) {
        this.passives[id] = (this.passives[id] || 0) + 1;
        this.applyStats();
    }

    applyStats() {
        this.maxHp = GameConfig.player.hp + (this.passives.heart ? this.passives.heart * 20 : 0);
        this.speed = GameConfig.player.speed + (this.passives.boots ? this.passives.boots * 40 : 0);
        this.magnetRange = GameConfig.player.magnetRange + (this.passives.magnet ? this.passives.magnet * 40 : 0);
    }

    update(dt, input) {
        if (input.keys['ArrowUp'] || input.keys['w']) this.y -= this.speed * dt;
        if (input.keys['ArrowDown'] || input.keys['s']) this.y += this.speed * dt;
        if (input.keys['ArrowLeft'] || input.keys['a']) this.x -= this.speed * dt;
        if (input.keys['ArrowRight'] || input.keys['d']) this.x += this.speed * dt;
    }

    draw(ctx, camera) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(960 - 20, 540 - 20, 40, 40);
        
        ctx.fillStyle = 'red';
        ctx.fillRect(960 - 30, 540 - 40, 60, 5);
        ctx.fillStyle = 'lime';
        ctx.fillRect(960 - 30, 540 - 40, 60 * (this.hp / this.maxHp), 5);
    }
}
