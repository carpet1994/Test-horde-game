export default class Enemy {
    constructor(x, y, type) {
        this.x = x; this.y = y; this.type = type;
        this.maxHp = type === 'slime' ? 5 : 2;
        this.hp = this.maxHp;
        this.flash = 0;
    }
    takeDamage(amount, knockbackDir) {
        this.hp -= amount;
        this.flash = 0.1;
        this.x += knockbackDir.x * 20; // Knockback
        this.y += knockbackDir.y * 20;
    }
    draw(ctx, camera) {
        ctx.fillStyle = this.flash > 0 ? 'white' : (this.type === 'slime' ? '#77ff77' : '#ff7777');
        ctx.fillRect(this.x - camera.x - 30, this.y - camera.y - 30, 60, 60);
        // Bar
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - camera.x - 30, this.y - camera.y - 45, 60, 5);
        ctx.fillStyle = 'lime';
        ctx.fillRect(this.x - camera.x - 30, this.y - camera.y - 45, 60 * (this.hp/this.maxHp), 5);
    }
}
