export const GameConfig = {
    resolution: {
        width: 1920,
        height: 1080
    },
    player: {
        hp: 100,
        speed: 400,
        magnetRange: 200,
        baseDamage: 10,
        attackCooldown: 1.0
    },
    enemies: {
        slime: {
            hp: 15,
            speed: 120,
            damage: 5,
            xpValue: 1
        },
        bat: {
            hp: 8,
            speed: 220,
            damage: 3,
            xpValue: 2
        },
        brute: {
            hp: 60,
            speed: 80,
            damage: 15,
            xpValue: 5
        },
        crawler: {
            hp: 25,
            speed: 160,
            damage: 8,
            xpValue: 3
        },
        elite: {
            hp: 150,
            speed: 100,
            damage: 20,
            xpValue: 15
        },
        boss: {
            hp: 1000,
            speed: 90,
            damage: 30,
            xpValue: 100
        }
    },
    scaling: {
        hpMult: 0.15,
        speedMult: 0.05,
        spawnRateMult: 0.2,
        intervalSeconds: 30
    },
    xp: {
        baseRequired: 10,
        exponent: 1.25
    },
    shop: {
        upgrades: {
            maxHp: { baseCost: 50, costMultiplier: 1.5, increment: 5 },
            damage: { baseCost: 50, costMultiplier: 1.5, increment: 0.05 },
            moveSpeed: { baseCost: 50, costMultiplier: 1.5, increment: 0.03 },
            xpGain: { baseCost: 50, costMultiplier: 1.5, increment: 0.05 },
            pickupRange: { baseCost: 50, costMultiplier: 1.5, increment: 0.05 }
        }
    }
};
