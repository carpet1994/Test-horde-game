import { GameConfig } from '../config/GameConfig.js';

export default class Enemy {
    constructor(x, y, type, survivalTimer) {
        this.x = x;
        this.y = y;
        this.type = type;
        
        const baseStats = GameConfig.enemies[type];
        const scaling = 1 + (survivalTimer / 300);
        
        this.maxHp = Math.floor(baseStats.hp * scaling);
        this.hp = this.maxHp;
        this.speed = baseStats.speed * (1 + (survivalTimer / 600));
        
        this.radius = type === 'crawler' ? 25 : 30;
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
        this.x += knockbackDir.x * 20;
        this.y += knockbackDir.y * 20;
    }

    draw(ctx, camera) {
        ctx.fillStyle = this.flash > 0 ? 'white' : GameConfig.enemies[this.type].color;
        
        ctx.fillRect(
            this.x - camera.x - this.radius,
            this.y - camera.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - camera.x - this.radius, this.y - camera.y - this.radius - 10, this.radius * 2, 5);
        ctx.fillStyle = 'lime';
        ctx.fillRect(
            this.x - camera.x - this.radius, 
            this.y - camera.y - this.radius - 10, 
            (this.radius * 2) * (this.hp / this.maxHp), 
            5
        );
    }
}
