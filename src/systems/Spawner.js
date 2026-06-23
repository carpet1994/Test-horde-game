import { WAVE_CONFIG } from '../config/WaveConfig.js';

export default class Spawner {
    constructor() { this.timer = 0; }

    update(dt, enemies, player) {
        if (enemies.length > 200) return; // Performance cap

        this.timer += dt;
        const wave = this.getCurrentWave();
        
        if (this.timer >= wave.spawnDelay) {
            this.spawn(enemies, player, wave);
            this.timer = 0;
        }
    }

    spawn(enemies, player, wave) {
        // Random point outside 1920x1080 bounds
        const angle = Math.random() * Math.PI * 2;
        const dist = 1200;
        const x = player.x + Math.cos(angle) * dist;
        const y = player.y + Math.sin(angle) * dist;
        
        // Random selection based on rates in WaveConfig
        const type = this.pickEnemyType(wave.rates);
        enemies.push(new Enemy(x, y, type));
    }

    getCurrentWave() {
        // Find latest config entry based on game time
        return [...WAVE_CONFIG].reverse().find(w => gameTime >= w.time);
    }
}
