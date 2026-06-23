export default class WeaponSystem {
    constructor() { this.projectiles = []; this.timer = 0; }
    update(dt, player, enemies) {
        this.timer += dt;
        if (this.timer >= 0.6 && enemies.length > 0) {
            let target = enemies[0]; // Simplest: target first in array
            this.projectiles.push({ x: player.x, y: player.y, targetX: target.x, targetY: target.y, speed: 600 });
            this.timer = 0;
        }
        this.projectiles.forEach((p, i) => {
            let dx = p.targetX - p.x; let dy = p.targetY - p.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            p.x += (dx / dist) * p.speed * dt;
            p.y += (dy / dist) * p.speed * dt;
            if (dist < 10) this.projectiles.splice(i, 1);
        });
    }
}
