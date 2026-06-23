export default class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tileSize = 128;
    }

    draw(ctx, camera) {
        const startX = Math.floor(camera.x / this.tileSize);
        const startY = Math.floor(camera.y / this.tileSize);
        const endX = startX + Math.ceil(1920 / this.tileSize) + 1;
        const endY = startY + Math.ceil(1080 / this.tileSize) + 1;

        for (let x = startX; x < endX; x++) {
            for (let y = startY; y < endY; y++) {
                this.drawTile(ctx, x, y, camera);
            }
        }
    }

    drawTile(ctx, x, y, camera) {
        const screenX = x * this.tileSize - camera.x;
        const screenY = y * this.tileSize - camera.y;

        ctx.fillStyle = (x + y) % 2 === 0 ? '#2d4a22' : '#335227';
        ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);

        if ((x * y) % 15 === 0) {
            ctx.fillStyle = '#1e3316';
            ctx.beginPath();
            ctx.arc(screenX + 64, screenY + 64, 20, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    }
