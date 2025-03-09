// game.js
class MiningGame {
    constructor() {
        this.state = {
            gold: 0,
            clickValue: 1
        };

        this.goldCounter = document.getElementById("gold-counter");
        this.mineButton = document.getElementById("mine-button");

        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        this.mineButton.addEventListener("click", () => this.handleMine());
    }

    handleMine() {
        this.state.gold += this.state.clickValue;
        this.updateDisplay();
    }

    updateDisplay() {
        this.goldCounter.textContent = `金币: ${this.state.gold}`;
    }
}

// 初始化游戏
document.addEventListener("DOMContentLoaded", () => {
    new MiningGame();
});