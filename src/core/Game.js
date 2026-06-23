import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import Input from './Input.js';
import WeaponSystem from '../systems/WeaponSystem.js';
import Spawner from '../systems/Spawner.js';

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1920;
        this.canvas.height = 1080;

        this.input = new Input();
        this.player = new Player(960, 540);
        this.weaponSystem = new WeaponSystem();
        this.spawner = new Spawner();
        
        this.enemies = [];
        this.killCount = 0;
        this.survivalTimer = 0;
        this.lastTime = 0;
        this.running = true;
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {
        if (!this.running) return;
        let dt = (timestamp - this.lastTime) / 1000;
        if (dt > 0.1) dt = 0.1; // Cap delta time to prevent physics tunneling
        this.lastTime = timestamp;

        this.update(dt);
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
        this.survivalTimer += dt;
        
        // 1. Move Player
        this.player.update(dt, this.input);

        // 2. Camera follows player
        this.camera = { x: this.player.x - 960, y: this.player.y - 540 };

        // 3. Spawner
        this.spawner.update(dt, this.enemies, this.player);

        // 4. Enemies
        this.enemies.forEach((enemy, index) => {
            enemy.update(dt, this.player);
            
            // Basic collision with player
            let dx = this.player.x - enemy.x;
            let dy = this.player.y - enemy.y;
            if (Math.hypot(dx, dy) < 50) {
                // Future: trigger damage/game over
            }
        });

        // 5. Weapons
        this.weaponSystem.update(dt, this.player, this.enemies);
        
        // 6. Cleanup: Check projectile/enemy hits
        this.handleCombat();
    }

    handleCombat() {
        this.weaponSystem.projectiles.forEach((p, pIdx) => {
            this.enemies.forEach((e, eIdx) => {
                if (Math.hypot(p.x - e.x, p.y - e.y) < 40) {
                    this.enemies.splice(eIdx, 1);
                    this.weaponSystem.projectiles.splice(pIdx, 1);
                    this.killCount++;
                }
            });
        });
    }

    draw() {
        // Clear screen
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw entities relative to camera
        this.player.draw(this.ctx, this.camera);
        this.enemies.forEach(e => e.draw(this.ctx, this.camera));
        this.weaponSystem.draw(this.ctx, this.camera);

        // Draw UI
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.fillText(`Kills: ${this.killCount}`, 50, 50);
        this.ctx.fillText(`Time: ${Math.floor(this.survivalTimer)}s`, 50, 90);
        this.ctx.fillText(`Pos: ${Math.floor(this.player.x)}, ${Math.floor(this.player.y)}`, 50, 130);
    }
}
