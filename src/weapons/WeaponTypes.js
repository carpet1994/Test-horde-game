export class ArcaneBolt {
    constructor() { this.id = 'bolt'; this.level = 1; this.cooldown = 0.6; this.timer = 0; this.projectiles = []; }
    levelUp() { if (this.level < 8) this.level++; }
    update(dt, player, enemies) {
        this.timer += dt;
        if (this.timer >= this.cooldown && enemies.length > 0) {
            let target = enemies[0];
            this.projectiles.push({ x: player.x, y: player.y, targetX: target.x, targetY: target.y, speed: 600 });
            this.timer = 0;
        }
        this.projectiles.forEach((p, i) => {
            let dx = p.targetX - p.x;
            let dy = p.targetY - p.y;
            let dist = Math.hypot(dx, dy);
            p.x += (dx / dist) * p.speed * dt;
            p.y += (dy / dist) * p.speed * dt;
            if (dist < 10) this.projectiles.splice(i, 1);
        });
    }
    draw(ctx, camera) {
        ctx.fillStyle = '#44ccff';
        this.projectiles.forEach(p => ctx.fillRect(p.x - camera.x - 5, p.y - camera.y - 5, 10, 10));
    }
}

export class ArcaneStorm {
    constructor() { this.id = 'storm'; this.level = 'Evolved'; }
    update(dt, player, enemies) { }
    draw(ctx, camera) { ctx.fillStyle = '#ff00ff'; ctx.fillRect(player.x - camera.x - 20, player.y - camera.y - 20, 40, 40); }
}

export class OrbitingBlade {
    constructor() { this.id = 'orbit'; this.level = 1; this.angle = 0; this.speed = 3; }
    levelUp() { if (this.level < 8) this.level++; }
    update(dt, player) { this.angle += this.speed * dt; }
    draw(ctx, camera) {
        ctx.fillStyle = '#ffffff';
        let x = player.x - camera.x + Math.cos(this.angle) * 100;
        let y = player.y - camera.y + Math.sin(this.angle) * 100;
        ctx.fillRect(x - 10, y - 10, 20, 20);
    }
}

export class CelestialBlades {
    constructor() { this.id = 'celestial'; this.level = 'Evolved'; }
    update(dt, player) { }
    draw(ctx, camera) { ctx.fillStyle = '#ffcc00'; ctx.fillRect(player.x - camera.x - 30, player.y - camera.y - 30, 60, 60); }
}

export class HolyPulse {
    constructor() { this.id = 'pulse'; this.level = 1; this.radius = 0; }
    levelUp() { if (this.level < 8) this.level++; }
    update(dt, player) { this.radius = (this.radius + dt * 100) % 300; }
    draw(ctx, camera) {
        ctx.strokeStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(player.x - camera.x, player.y - camera.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

export class DivineNova {
    constructor() { this.id = 'nova'; this.level = 'Evolved'; }
    update(dt, player) { }
    draw(ctx, camera) { ctx.fillStyle = '#ff0000'; ctx.fillRect(player.x - camera.x - 40, player.y - camera.y - 40, 80, 80); }
}

export class LightningMark {
    constructor() { this.id = 'light'; this.level = 1; this.timer = 0; }
    levelUp() { if (this.level < 8) this.level++; }
    update(dt, player, enemies) { this.timer += dt; if (this.timer > 2) this.timer = 0; }
    draw(ctx, camera) { }
}

export class ThunderCrown {
    constructor() { this.id = 'crown'; this.level = 'Evolved'; }
    update(dt, player) { }
    draw(ctx, camera) { ctx.fillStyle = '#00ffff'; ctx.fillRect(player.x - camera.x - 20, player.y - camera.y - 20, 40, 40); }
        }
        
