export const SpriteManager = {
    cache: {},
    init() {
        this.create('player', (ctx) => {
            ctx.fillStyle = '#fff'; ctx.fillRect(60, 40, 60, 80);
            ctx.fillStyle = '#ffccaa'; ctx.fillRect(70, 20, 40, 40);
            ctx.fillStyle = '#33f'; ctx.fillRect(50, 40, 20, 40);
        });
        this.create('slime', (ctx) => {
            ctx.fillStyle = '#77ff77'; ctx.beginPath();
            ctx.arc(91, 120, 60, 0, Math.PI * 2); ctx.fill();
        });
        this.create('bat', (ctx) => {
            ctx.fillStyle = '#ff7777';
            ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(162, 20); ctx.lineTo(91, 100); ctx.fill();
        });
        this.create('brute', (ctx) => {
            ctx.fillStyle = '#7777ff'; ctx.fillRect(21, 21, 140, 140);
        });
        this.create('crawler', (ctx) => {
            ctx.fillStyle = '#ffff77'; ctx.ellipse(91, 91, 80, 40, 0, 0, Math.PI * 2); ctx.fill();
        });
        this.create('elite', (ctx) => {
            ctx.fillStyle = '#ff00ff'; ctx.fillRect(41, 41, 100, 100);
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 10; ctx.strokeRect(41, 41, 100, 100);
        });
        this.create('boss', (ctx) => {
            ctx.fillStyle = '#550000'; ctx.fillRect(10, 10, 162, 162);
            ctx.fillStyle = '#ff0000'; ctx.fillRect(40, 40, 102, 102);
        });
        this.create('gem', (ctx) => {
            ctx.fillStyle = '#00ff00'; ctx.beginPath();
            ctx.moveTo(91, 20); ctx.lineTo(162, 60); ctx.lineTo(162, 122); ctx.lineTo(91, 162);
            ctx.lineTo(20, 122); ctx.lineTo(20, 60); ctx.closePath(); ctx.fill();
        });
        this.create('coin', (ctx) => {
            ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(91, 91, 50, 0, Math.PI * 2); ctx.fill();
        });
        this.create('chest', (ctx) => {
            ctx.fillStyle = '#8b4513'; ctx.fillRect(20, 60, 142, 102);
            ctx.fillStyle = '#ffd700'; ctx.fillRect(70, 80, 42, 30);
        });
        this.create('bolt', (ctx) => {
            ctx.fillStyle = '#44ccff'; ctx.fillRect(70, 70, 42, 42);
        });
        this.create('mark', (ctx) => {
            ctx.fillStyle = '#ffff00'; ctx.beginPath(); ctx.moveTo(91, 0); ctx.lineTo(182, 182); ctx.lineTo(0, 182); ctx.fill();
        });
        this.create('pulse', (ctx) => {
            ctx.strokeStyle = '#ffff00'; ctx.lineWidth = 20;
            ctx.beginPath(); ctx.arc(91, 91, 80, 0, Math.PI * 2); ctx.stroke();
        });
        this.create('blade', (ctx) => {
            ctx.fillStyle = '#ffffff'; ctx.rotate(Math.PI / 4);
            ctx.fillRect(100, -30, 80, 80);
        });
    },
    create(key, drawFn) {
        const canvas = document.createElement('canvas');
        canvas.width = 182; canvas.height = 182;
        drawFn(canvas.getContext('2d'));
        this.cache[key] = canvas;
    }
};
