import { UI } from "./UI.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { InputHander } from "./input.js";
import { Player } from "./player.js";
import { EStates } from "./playerStates.js";

export class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth;
    this.height = gameHeight;
    this.groundMargin = 80;
    this.gameSpeed = 0;
    this.maxGameSpeed = 6;

    this.player = new Player(this);
    this.input = new InputHander(this);
    this.background = new Background(this);
    this.UI = new UI(this);

    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.maxEnemies = 10;

    this.debug = true;

    this.score = 0;
    this.fontColor = "black";

    this.player.currenState = this.player.states[EStates.SITTING];
    this.player.currenState.enter();
  }
  update(deltaTime) {
    this.background.update();
    this.player.update(this.input.keys, deltaTime);

    // handle enemies
    if (this.enemyTimer > this.enemyInterval && this.enemies.length < this.maxEnemies) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else this.enemyTimer += deltaTime;

    this.enemies.forEach((enemy, index) => {
      enemy.update(deltaTime);

      // There are three ways to remove the enemy from an array.
      if (enemy.markedForDeletion) this.enemies.splice(index, 1);
      // if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
    });
    // this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
  }
  draw(ctx) {
    this.background.draw(ctx);
    this.player.draw(ctx);
    this.enemies.forEach((enemy) => enemy.draw(ctx));
    this.UI.draw(ctx);
  }
  addEnemy() {
    if (this.gameSpeed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
    else if (this.gameSpeed > 0) this.enemies.push(new ClimbingEnemy(this));

    this.enemies.push(new FlyingEnemy(this));
  }
}
