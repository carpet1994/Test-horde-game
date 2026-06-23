export const GameConfig = {
    resolution: {
        width: 1920,
        height: 1080
    },
    player: {
        hp: 100,
        speed: 400,
        size: 80,
        magnetRange: 200
    },
    enemies: {
        slime: {
            hp: 5,
            speed: 150,
            color: '#77ff77'
        },
        bat: {
            hp: 2,
            speed: 250,
            color: '#ff7777'
        },
        brute: {
            hp: 20,
            speed: 100,
            color: '#7777ff'
        },
        crawler: {
            hp: 8,
            speed: 200,
            color: '#ffff77'
        }
    },
    weapon: {
        cooldown: 0.6,
        projectileSpeed: 600,
        damage: 1
    },
    spawnSettings: {
        maxEnemies: 200,
        bossInterval: 120
    }
};
