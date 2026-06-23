import * as W from 'src/weapons/WeaponTypes.js';
import { EVOLUTION_DATA } from 'src/config/EvolutionConfig.js';

export default class WeaponManager {
    constructor() { this.weapons = [new W.ArcaneBolt()]; }
    update(dt, player, enemies) { this.weapons.forEach(w => w.update(dt, player, enemies)); }
    draw(ctx, camera) { this.weapons.forEach(w => w.draw(ctx, camera)); }

    addOrUpgradeWeapon(id) {
        const existing = this.weapons.find(w => w.id === id);
        if (existing) existing.levelUp();
        else this.weapons.push(this.createNewWeapon(id));
    }

    evolveWeapon(id) {
        const index = this.weapons.findIndex(w => w.id === id);
        const config = EVOLUTION_DATA[id];
        if (index !== -1 && config) {
            this.weapons[index] = this.createNewWeapon(config.result);
        }
    }

    createNewWeapon(id) {
        switch(id) {
            case 'bolt': return new W.ArcaneBolt();
            case 'storm': return new W.ArcaneStorm();
            case 'orbit': return new W.OrbitingBlade();
            case 'celestial': return new W.CelestialBlades();
            case 'pulse': return new W.HolyPulse();
            case 'nova': return new W.DivineNova();
            case 'light': return new W.LightningMark();
            case 'crown': return new W.ThunderCrown();
            default: return null;
        }
    }
    }
