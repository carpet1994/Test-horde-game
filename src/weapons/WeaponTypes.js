export class OrbitingBlade {
    constructor() {
        this.id = 'orbit';
        this.level = 1;
        this.blades = 1;
        this.orbitSpeed = 2;
        this.damage = 1;
        this.angle = 0;
    }

    update(dt, player) {
        this.angle += this.orbitSpeed * dt;
        // Logic for hit detection with enemies
    }

    draw(ctx, camera) {
        // Draw rotating blades around player
    }
}
