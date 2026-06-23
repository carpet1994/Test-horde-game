import Game from './core/Game.js';
import { StorageManager } from './core/StorageManager.js';

let currentState = 'shop'; 

function showShop() {
    const data = StorageManager.load();
    document.body.innerHTML = `
        <div id="shop">
            <h1>Coins: ${data.coins}</h1>
            <button onclick="buyUpgrade('hp')">Upgrade HP</button>
            <button onclick="startGame()">START RUN</button>
        </div>
    `;
}

function startGame() {
    document.body.innerHTML = '<canvas id="gameCanvas"></canvas>';
    const game = new Game('gameCanvas', (stats) => {
        console.log("Run Ended", stats);
        setTimeout(showShop, 2000);
    });
    game.start();
}

window.buyUpgrade = (id) => { /* Logic to update localStorage */ };
window.startGame = startGame;
showShop();
