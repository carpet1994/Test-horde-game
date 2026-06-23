export const GameConfig = {
    resolution: { width: 1920, height: 1080 },
    spriteSize: 182,
    player: {
        hp: 100,
        speed: 400,
        size: 80, // Collision radius
    },
    enemies: {
        slime: { hp: 5, speed: 150, color: '#77ff77' },
        bat: { hp: 2, speed: 250, color: '#ff7777' }
    },
    weapon: {
        cooldown: 0.6,
        projectileSpeed: 600,
        damage: 1
    }
};
