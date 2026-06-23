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
        this.floatingTexts = [];
        this.killCount = 0;
        this.survivalTimer = 0;
        this.lastTime = 0;
        this.running = true;
        this.shake = 0; // Screen shake intensity
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {
        if (!this.running) {
            this.drawGameOver();
            return;
        }

        let dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;

        this.update(dt);
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
        this.survivalTimer += dt;
        if (this.shake > 0) this.shake -= dt * 10;

        this.player.update(dt, this.input);
        this.spawner.update(dt, this.enemies, this.player);

        // Enemies & Collision
        this.enemies.forEach((enemy, index) => {
            enemy.update(dt, this.player);
            
            // Player collision
            let dx = this.player.x - enemy.x;
            let dy = this.player.y - enemy.y;
            if (Math.hypot(dx, dy) < 60) {
                if (this.player.invincible <= 0) {
                    this.player.takeDamage(10);
                    this.shake = 2; // Trigger screen shake
                }
            }
        });

        this.weaponSystem.update(dt, this.player, this.enemies);
        this.handleCombat();
        
        // Floating texts update
        this.floatingTexts.forEach((ft, i) => {
            ft.y -= 50 * dt;
            ft.life -= dt;
            if (ft.life <= 0) this.floatingTexts.splice(i, 1);
        });

        if (this.player.hp <= 0) this.running = false;
    }

    handleCombat() {
        this.weaponSystem.projectiles.forEach((p, pIdx) => {
            this.enemies.forEach((e, eIdx) => {
                if (Math.hypot(p.x - e.x, p.y - e.y) < 40) {
                    let knockback = { x: (e.x - p.x) / 50, y: (e.y - p.y) / 50 };
                    e.takeDamage(1, knockback);
                    this.weaponSystem.projectiles.splice(pIdx, 1);
                    
                    if (e.hp <= 0) {
                        this.enemies.splice(eIdx, 1);
                        this.killCount++;
                        this.floatingTexts.push({ text: '1', x: e.x, y: e.y, life: 1 });
                    }
                }
            });
        });
    }

    draw() {
        let camX = this.player.x - 960 + (Math.random() - 0.5) * this.shake * 10;
        let camY = this.player.y - 540 + (Math.random() - 0.5) * this.shake * 10;
        let camera = { x: camX, y: camY };

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw(this.ctx, camera);
        this.enemies.forEach(e => e.draw(this.ctx, camera));
        this.weaponSystem.draw(this.ctx, camera);

        // UI
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.fillText(`Kills: ${this.killCount}`, 50, 50);
        this.ctx.fillText(`Time: ${Math.floor(this.survivalTimer)}s`, 50, 90);
        // Large UI Health Bar
        this.ctx.fillStyle = '#444';
        this.ctx.fillRect(50, 110, 200, 20);
        this.ctx.fillStyle = 'lime';
        this.ctx.fillRect(50, 110, 200 * (this.player.hp / this.player.maxHp), 20);
    }

    drawGameOver() {
        this.ctx.fillStyle = 'rgba(0,0,0,0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = '80px Arial';
        this.ctx.fillText('GAME OVER', 960, 500);
        this.ctx.font = '40px Arial';
        this.ctx.fillText(`Survived: ${Math.floor(this.survivalTimer)}s | Kills: ${this.killCount}`, 960, 600);
        this.ctx.fillText('Press R to Restart', 960, 700);
    }
}
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
drawGameOver() {
        this.ctx.fillStyle = 'rgba(0,0,0,0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = '80px Arial';
        this.ctx.fillText('GAME OVER', 960, 500);
        this.ctx.font = '40px Arial';
        this.ctx.fillText(`Survived: ${Math.floor(this.survivalTimer)}s | Kills: ${this.killCount}`, 960, 600);
        this.ctx.fillText('Press R to Restart', 960, 700);
    }
}
