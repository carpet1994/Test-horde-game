import { WAVE_CONFIG } from '../config/WaveConfig.js';
import Enemy from '../entities/Enemy.js';
import Boss from '../entities/Boss.js';

export default class Spawner {
    constructor() {
        this.timer = 0;
        this.bossTimer = 0;
        this.spawnCount = 0;
    }

    update(dt, enemies, player, survivalTimer) {
        // Performance Cap: Do not spawn if there are too many enemies
        if (enemies.length > 200) return;

        this.timer += dt;
        this.bossTimer += dt;

        const wave = this.getCurrentWave(survivalTimer);

        // Spawn logic
        if (this.timer >= wave.spawnDelay) {
            this.spawnNormalEnemy(enemies, player, wave, survivalTimer);
            this.timer = 0;
        }

        // Boss logic: Attempt to spawn boss every 120 seconds
        if (this.bossTimer >= 120) {
            this.spawnBoss(enemies, player, survivalTimer);
            this.bossTimer = 0;
        }
    }

    spawnNormalEnemy(enemies, player, wave, survivalTimer) {
        const { x, y } = this.getRandomSpawnPosition(player);
        const type = this.pickEnemyType(wave.rates);
        
        enemies.push(new Enemy(x, y, type, survivalTimer));
    }

    spawnBoss(enemies, player, survivalTimer) {
        const { x, y } = this.getRandomSpawnPosition(player);
        enemies.push(new Boss(x, y, survivalTimer));
    }

    getRandomSpawnPosition(player) {
        // Spawn in a circle outside the screen bounds (approx 1200px radius)
        const angle = Math.random() * Math.PI * 2;
        const dist = 1200;
        return {
            x: player.x + Math.cos(angle) * dist,
            y: player.y + Math.sin(angle) * dist
        };
    }

    pickEnemyType(rates) {
        const rand = Math.random();
        let cumulative = 0;
        for (const type in rates) {
            cumulative += rates[type];
            if (rand <= cumulative) return type;
        }
        return 'slime'; // Fallback
    }

    getCurrentWave(survivalTimer) {
        // Returns the wave configuration based on the time elapsed
        const wave = [...WAVE_CONFIG].reverse().find(w => survivalTimer >= w.time);
        return wave || WAVE_CONFIG[0];
    }
}
