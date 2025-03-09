// Store.js
export class Store {
  constructor(gameState) {
    this.game = gameState;
    // 延迟初始化任务，确保generateRandomQuests可用
  }


  // 通用升级方法
  performUpgrade(costKey, levelKey, costMultiplier, callback) {
    if (this.game.gold >= this.game[costKey]) {
      this.game.gold -= this.game[costKey];
      this.game[levelKey]++;
      this.game[costKey] = Math.round(this.game[costKey] * costMultiplier);
      this.game.upgradeSound.play();
      callback?.(); // 可选回调
      this.updateGame();
    }
  }

  // 具体升级方法简化为单行调用
  upgradePickaxe() {
    this.performUpgrade('pickaxeCost', 'pickaxeLevel', 1.4);
  }

  buyMiner() {
    this.performUpgrade('minerCost', 'miners', 1.25);
  }

  // 其他升级方法类似重构...

  // 统一更新逻辑
  updateGame() {
    updateDisplay();
    saveGame();
    updateQuests();
  }

  // 暴击升级专用方法（需要特殊计算）
  upgradeCritChance() {
    if (this.game.gold >= this.game.critChanceCost) {
      this.game.gold -= this.game.critChanceCost;
      this.game.critChanceLevel++;

      const upgrades = this.game.critChanceLevel - 1;
      this.game.critChance = 0.1 +
        Math.min(upgrades, 5) * 0.03 +
        Math.max(upgrades - 5, 0) * 0.02;

      this.game.critChanceCost = Math.round(this.game.critChanceCost * 1.8);
      this.game.upgradeSound.play();
      this.updateGame();
    }
  }

  upgradeCritMultiplier() {
    this.performUpgrade('critMultiplierCost', 'critMultiplierLevel', 1.8, () => {
      this.game.critMultiplier = 2 + (this.game.critMultiplierLevel - 1) * 0.5;
    });
  }

  upgradeOfflineMultiplier() {
    this.performUpgrade('offlineMultiplierCost', 'offlineMultiplierLevel', 2.2, () => {
      this.game.offlineMultiplier = 1 + (this.game.offlineMultiplierLevel - 1) * 0.5;
    });
  }
}