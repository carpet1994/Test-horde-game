import { GameConfig } from '../config/GameConfig.js';

export default class Boss {
    constructor(x, y, survivalTime) {
        this.x = x;
        this.y = y;
        // Boss health scales based on survival time (500 base + 2 per second)
        this.maxHp = 500 + (survivalTime * 2);
        this.hp = this.maxHp;
        
        this.size = 120; // Bosses are larger
        this.radius = 60; // Hitbox radius
        this.speed = 80;  // Bosses move slower than regular enemies
        this.flash = 0;
    }

    update(dt, player) {
        if (this.flash > 0) this.flash -= dt;

        // Pathfinding: Move toward player
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
        // Bosses are heavy; they receive less knockback
        this.x += (knockbackDir.x * 2);
        this.y += (knockbackDir.y * 2);
    }

    draw(ctx, camera) {
        // Boss body
        ctx.fillStyle = this.flash > 0 ? 'white' : '#8800ff'; // Distinctive purple boss color
        ctx.fillRect(
            this.x - camera.x - this.radius, 
            this.y - camera.y - this.radius, 
            this.radius * 2, 
            this.radius * 2
        );

        // Boss Health Bar (Centered above boss)
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - camera.x - 50, this.y - camera.y - 90, 100, 8);
        ctx.fillStyle = '#ffcc00'; // Gold health bar for boss
        ctx.fillRect(
            this.x - camera.x - 50, 
            this.y - camera.y - 90, 
            100 * (this.hp / this.maxHp), 
            8
        );
    }
}
