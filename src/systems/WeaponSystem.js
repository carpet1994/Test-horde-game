import { ArcaneBolt, OrbitingBlade, HolyPulse, LightningMark } from '../weapons/WeaponTypes.js';

export default class WeaponManager {
    constructor() {
        this.weapons = [new ArcaneBolt()];
    }

    update(dt, player, enemies) {
        this.weapons.forEach(w => w.update(dt, player, enemies));
    }

    draw(ctx, camera) {
        this.weapons.forEach(w => w.draw(ctx, camera));
    }

    addOrUpgradeWeapon(id) {
        const existing = this.weapons.find(w => w.id === id);
        if (existing) {
            existing.levelUp();
        } else {
            const newWeapon = this.createNewWeapon(id);
            if (newWeapon) this.weapons.push(newWeapon);
        }
    }

    createNewWeapon(id) {
        switch(id) {
            case 'bolt': return new ArcaneBolt();
            case 'orbit': return new OrbitingBlade();
            case 'pulse': return new HolyPulse();
            case 'light': return new LightningMark();
            default: return null;
        }
    }
}
