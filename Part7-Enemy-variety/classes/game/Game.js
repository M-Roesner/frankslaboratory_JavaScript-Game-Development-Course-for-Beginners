import { Ghost } from "../enemies/Ghost.js";
import { Spider } from "../enemies/Spider.js";
import { Worm } from "../enemies/Worm.js";

export class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.enemies = [];
    this.enemyInterval = 100;
    this.enemyTimer = 0;
    this.enemyTypes = ["worm", "ghost", "spider"];
    this.enemyMaxSpiders = 10;
  }
  update(deltaTime) {
    // removes enemies wich are out of the screen
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    // adds new enemies every 1000ms
    if (this.enemyTimer >= this.enemyInterval) {
      this.#addNewEnemy();
      this.enemyTimer = 0;
    } else this.enemyTimer += deltaTime;

    this.enemies.forEach((enemy) => enemy.update(deltaTime));

    // console.log(this.enemies);
  }
  draw() {
    this.enemies.forEach((enemy) => enemy.draw(this.ctx));
  }
  #addNewEnemy() {
    // adds randomly enemies to the game, depending on the length of the enemyTypes.
    const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];

    switch (randomEnemy) {
      case "worm":
        this.enemies.push(new Worm(this));
        break;
      case "ghost":
        this.enemies.push(new Ghost(this));
        break;
      case "spider":
        const spiders = this.enemies.filter((enemy) => enemy instanceof Spider);
        if (spiders.length <= this.enemyMaxSpiders) this.enemies.push(new Spider(this));
        break;
    }

    // sorts the enemies by y-coordinate if i added a new enemy
    // this.enemies.sort((a, b) => a.y - b.y);
  }
}
