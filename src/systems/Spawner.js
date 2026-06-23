import { WAVE_CONFIG } from 'src/config/WaveConfig.js';
import Enemy from 'src/entities/Enemy.js';
import Boss from 'src/entities/Boss.js';

export default class Spawner {
    constructor() {
        this.timer = 0;
        this.bossTimer = 0;
        this.bossSpawnedAt = {};
    }

    update(dt, enemies, player, survivalTimer) {
        if (enemies.length > 200) return;

        this.timer += dt;
        this.bossTimer += dt;

        const wave = this.getCurrentWave(survivalTimer);

        if (this.timer >= wave.spawnDelay) {
            this.spawnNormalEnemy(enemies, player, wave, survivalTimer);
            this.timer = 0;
        }

        if (Math.floor(survivalTimer) % 120 === 0 && survivalTimer > 10 && !this.bossSpawnedAt[Math.floor(survivalTimer)]) {
            this.spawnBoss(enemies, player, survivalTimer);
            this.bossSpawnedAt[Math.floor(survivalTimer)] = true;
        }
    }

    spawnNormalEnemy(enemies, player, wave, survivalTimer) {
        const pos = this.getRandomSpawnPosition(player);
        const type = this.pickEnemyType(wave.rates);
        enemies.push(new Enemy(pos.x, pos.y, type, survivalTimer));
    }

    spawnBoss(enemies, player, survivalTimer) {
        const pos = this.getRandomSpawnPosition(player);
        enemies.push(new Boss(pos.x, pos.y, survivalTimer));
    }

    getRandomSpawnPosition(player) {
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
        return 'slime';
    }

    getCurrentWave(survivalTimer) {
        const wave = [...WAVE_CONFIG].reverse().find(w => survivalTimer >= w.time);
        return wave || WAVE_CONFIG[0];
    }
}
