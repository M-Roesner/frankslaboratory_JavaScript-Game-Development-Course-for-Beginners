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

    this.worms = [];
    this.ghosts = [];
    this.spiders = [];
  }
  // removes enemies wich are out of the screen
  #removeEnemies() {
    // this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    this.worms = this.worms.filter((enemy) => !enemy.markedForDeletion);
    this.ghosts = this.ghosts.filter((enemy) => !enemy.markedForDeletion);
    this.spiders = this.spiders.filter((enemy) => !enemy.markedForDeletion);
    this.enemies = [...this.spiders, ...this.ghosts, ...this.worms];
  }

  update(deltaTime) {
    this.#removeEnemies();

    // adds new enemies acording to the enemyInterval.
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
        this.worms.push(new Worm(this));
        break;
      case "ghost":
        this.ghosts.push(new Ghost(this));
        console.log(this.ghosts);
        break;
      case "spider":
        // const spiders = this.enemies.filter((enemy) => enemy instanceof Spider);
        if (this.spiders.length <= this.enemyMaxSpiders) this.spiders.push(new Spider(this));
        break;
    }

    // sorts the enemies by y-coordinate if i added a new enemy
    // this.enemies.sort((a, b) => a.y - b.y);
  }
}
