import { UPGRADE_DATA } from '../config/UpgradesConfig.js';

export function getChoices(player, weaponManager) {
    let pool = [];
    
    // Add valid weapons
    Object.keys(UPGRADE_DATA.weapons).forEach(id => {
        const w = weaponManager.weapons.find(w => w.id === id);
        if (!w || w.level < UPGRADE_DATA.weapons[id].maxLevel) pool.push({ type: 'weapon', id });
    });

    // Add valid passives
    Object.keys(UPGRADE_DATA.passives).forEach(id => {
        const p = player.passives[id] || 0;
        if (p < UPGRADE_DATA.passives[id].maxLevel) pool.push({ type: 'passive', id });
    });

    // Shuffle and return 3
    return pool.sort(() => 0.5 - Math.random()).slice(0, 3);
}
