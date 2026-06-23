import { GameConfig } from '../config/GameConfig.js';
import Player from '../entities/Player.js';
import Input from './Input.js';
import WeaponSystem from '../systems/WeaponSystem.js';
import Spawner from '../systems/Spawner.js';
import CollisionSystem from '../systems/CollisionSystem.js';
import { getChoices } from '../systems/UpgradeManager.js';

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = GameConfig.resolution.width;
        this.canvas.height = GameConfig.resolution.height;

        this.input = new Input();
        this.player = new Player(960, 540);
        this.weaponSystem = new WeaponSystem();
        this.spawner = new Spawner();
        
        this.enemies = [];
        this.gems = [];
        this.floatingTexts = [];
        
        this.killCount = 0;
        this.survivalTimer = 0;
        this.lastTime = 0;
        this.running = true;
        this.isLevelingUp = false;
        this.currentChoices = [];
        this.shake = 0;
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {
        let dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;

        if (this.running && !this.isLevelingUp) {
            this.update(dt);
        }
        
        this.draw();
        
        if (this.running) requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
        this.survivalTimer += dt;
        this.player.update(dt, this.input);
        this.spawner.update(dt, this.enemies, this.player);
        this.weaponSystem.update(dt, this.player, this.enemies);
        
        CollisionSystem.update(this);

        this.gems.forEach((gem, i) => {
            gem.update(dt, this.player);
            let dist = Math.hypot(gem.x - this.player.x, gem.y - this.player.y);
            if (dist < 40) {
                this.player.addXP(gem.value);
                this.gems.splice(i, 1);
                if (this.player.checkLevelUp()) this.triggerLevelUp();
            }
        });
    }

    triggerLevelUp() {
        this.isLevelingUp = true;
        this.currentChoices = getChoices();
    }

    handleUpgradeSelection(index) {
        const choice = this.currentChoices[index];
        this.player.applyUpgrade(choice.id);
        this.isLevelingUp = false;
    }

    draw() {
        // Camera shake
        let camX = this.player.x - 960 + (Math.random() - 0.5) * this.shake * 10;
        let camY = this.player.y - 540 + (Math.random() - 0.5) * this.shake * 10;
        let camera = { x: camX, y: camY };

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw(this.ctx, camera);
        this.enemies.forEach(e => e.draw(this.ctx, camera));
        this.gems.forEach(g => g.draw(this.ctx, camera));
        this.weaponSystem.draw(this.ctx, camera);

        this.drawUI();
        if (this.isLevelingUp) this.drawLevelUpMenu();
        if (!this.running) this.drawGameOver();
    }

    drawUI() {
        // XP Bar
        this.ctx.fillStyle = '#222';
        this.ctx.fillRect(0, 1070, 1920, 10);
        this.ctx.fillStyle = '#00ccff';
        this.ctx.fillRect(0, 1070, 1920 * (this.player.xp / this.player.xpRequired), 10);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.fillText(`Level: ${this.player.level} | Kills: ${this.killCount}`, 50, 50);
    }

    drawLevelUpMenu() {
        this.ctx.fillStyle = 'rgba(0,0,0,0.9)';
        this.ctx.fillRect(0, 0, 1920, 1080);
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('LEVEL UP! Choose an upgrade:', 960, 300);
        
        this.currentChoices.forEach((c, i) => {
            this.ctx.strokeRect(660 + (i * 200), 400, 180, 200);
            this.ctx.fillText(c.name, 750 + (i * 200), 450);
            this.ctx.font = '16px Arial';
            this.ctx.fillText(c.desc, 750 + (i * 200), 500);
        });
    }

    drawGameOver() { /* Same as previous implementation */ }
}
