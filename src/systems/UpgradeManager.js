export const UPGRADES = [
    { id: 'dmg', name: 'Damage +', desc: '+1 Damage' },
    { id: 'spd', name: 'Fire Rate +', desc: '-0.1s Cooldown' },
    { id: 'mve', name: 'Speed +', desc: '+50 Move Speed' },
    { id: 'hp', name: 'Max HP +', desc: '+20 HP' },
    { id: 'heal', name: 'Heal', desc: 'Restore 20 HP' },
    { id: 'mag', name: 'Magnet +', desc: '+100 Pickup Range' }
];

export function getChoices() {
    return [...UPGRADES].sort(() => 0.5 - Math.random()).slice(0, 3);
}
