import { GameConfig } from '../config/GameConfig.js';
import { EVOLUTION_DATA } from '../config/EvolutionConfig.js';
import { StorageManager } from './StorageManager.js';
import Player from '../entities/Player.js';
import Input from './Input.js';
import WeaponManager from '../systems/WeaponSystem.js';
import Spawner from '../systems/Spawner.js';
import CollisionSystem from '../systems/CollisionSystem.js';
import { getChoices } from '../systems/UpgradeManager.js';

export default class Game {
    constructor(canvasId, onGameOver) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = GameConfig.resolution.width;
        this.canvas.height = GameConfig.resolution.height;

        this.input = new Input();
        this.player = new Player(960, 540);
        this.weaponManager = new WeaponManager();
        this.spawner = new Spawner();
        this.onGameOver = onGameOver;
        
        this.enemies = [];
        this.gems = [];
        this.chests = [];
        this.runStats = { time: 0, kills: 0, bosses: 0, earnedCoins: 0 };
        
        this.survivalTimer = 0;
        this.lastTime = 0;
        this.running = true;
        this.isLevelingUp = false;
        this.isChestState = false;
        this.gameOver = false;
        this.currentChoices = [];
        this.evolutionAvailable = null;
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {
        let dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;

        if (this.running && !this.isLevelingUp && !this.isChestState) {
            this.update(dt);
        }
        
        this.draw();
        
        if (this.running) requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
        this.survivalTimer += dt;
        this.player.update(dt, this.input);
        this.spawner.update(dt, this.enemies, this.player, this.survivalTimer);
        this.weaponManager.update(dt, this.player, this.enemies);
        CollisionSystem.update(this);
        
        if (this.player.hp <= 0) {
            this.triggerGameOver();
        }

        this.gems.forEach((gem, i) => {
            gem.update(dt, this.player);
            if (Math.hypot(gem.x - this.player.x, gem.y - this.player.y) < 40) {
                this.player.addXP(gem.value);
                this.gems.splice(i, 1);
                if (this.player.checkLevelUp()) this.triggerLevelUp();
            }
        });

        this.chests.forEach((chest, i) => {
            if (Math.hypot(chest.x - this.player.x, chest.y - this.player.y) < 60) {
                this.triggerChestReward();
                this.chests.splice(i, 1);
            }
        });
    }

    triggerLevelUp() {
        this.isLevelingUp = true;
        this.currentChoices = getChoices(this.player, this.weaponManager);
    }

    triggerChestReward() {
        this.isChestState = true;
        this.evolutionAvailable = null;
        for (const [id, data] of Object.entries(EVOLUTION_DATA)) {
            const w = this.weaponManager.weapons.find(wp => wp.id === id);
            if (w && w.level === 8 && this.player.passives[data.passive] >= 1) {
                this.evolutionAvailable = id;
                break;
            }
        }
    }

    handleChestClaim() {
        if (this.evolutionAvailable) this.weaponManager.evolveWeapon(this.evolutionAvailable);
        this.isChestState = false;
    }

    triggerGameOver() {
        this.running = false;
        this.gameOver = true;
        this.runStats.time = Math.floor(this.survivalTimer);
        const data = StorageManager.load();
        data.coins += this.runStats.earnedCoins;
        StorageManager.save(data);
        this.onGameOver(this.runStats);
    }

    draw() {
        let camX = this.player.x - 960;
        let camY = this.player.y - 540;
        let camera = { x: camX, y: camY };

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, 1920, 1080);

        this.player.draw(this.ctx, camera);
        this.enemies.forEach(e => e.draw(this.ctx, camera));
        this.gems.forEach(g => g.draw(this.ctx, camera));
        this.chests.forEach(c => c.draw(this.ctx, camera));
        this.weaponManager.draw(this.ctx, camera);
        
        this.drawUI();
        if (this.isLevelingUp) this.drawLevelUpMenu();
        if (this.isChestState) this.drawChestScreen();
        if (this.gameOver) this.drawGameOver();
    }

    drawUI() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.fillText(`Coins: ${this.runStats.earnedCoins}`, 1700, 50);
        this.ctx.fillText(`Time: ${Math.floor(this.survivalTimer)}s`, 50, 50);
    }

    drawLevelUpMenu() {
        this.ctx.fillStyle = 'rgba(0,0,0,0.9)';
        this.ctx.fillRect(0, 0, 1920, 1080);
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('LEVEL UP!', 960, 200);
        this.currentChoices.forEach((c, i) => {
            this.ctx.strokeRect(660 + (i * 200), 400, 180, 200);
            this.ctx.fillText(c.id, 750 + (i * 200), 450);
        });
    }

    drawChestScreen() {
        this.ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
        this.ctx.fillRect(400, 200, 1120, 680);
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.evolutionAvailable ? "WEAPON EVOLVED!" : "Treasure Found!", 960, 400);
    }

    drawGameOver() {
        this.ctx.fillStyle = 'rgba(0,0,0,0.9)';
        this.ctx.fillRect(0, 0, 1920, 1080);
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', 960, 540);
        this.ctx.fillText(`Total Coins Earned: ${this.runStats.earnedCoins}`, 960, 640);
    }
            }
