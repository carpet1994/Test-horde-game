export default class ParticleSystem {
    constructor() { this.particles = []; }
    emit(x, y, color, count = 10) {
        if (this.particles.length > 500) return;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x, y, color,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0
            });
        }
    }
    update(dt) {
        this.particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy; p.life -= dt * 2;
            if (p.life <= 0) this.particles.splice(i, 1);
        });
    }
    draw(ctx, camera) {
        this.particles.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - camera.x, p.y - camera.y, 4, 4);
        });
        ctx.globalAlpha = 1;
    }
}
