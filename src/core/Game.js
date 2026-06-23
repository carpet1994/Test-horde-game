import Player from '../entities/Player.js';
import Input from './Input.js';

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.player = new Player(960, 540);
        this.input = new Input();
        this.lastTime = 0;
    }

    start() { requestAnimationFrame(this.loop.bind(this)); }

    loop(timestamp) {
        let dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        this.update(dt);
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) { this.player.update(dt, this.input); }

    draw() {
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        // Basic Debug UI
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.fillText(`Pos: ${Math.floor(this.player.x)}, ${Math.floor(this.player.y)}`, 20, 50);
    }
}
