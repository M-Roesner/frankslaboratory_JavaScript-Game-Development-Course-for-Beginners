import { Background } from "./background.js";
import { InputHander } from "./input.js";
import { Player } from "./player.js";

export class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth;
    this.height = gameHeight;
    this.groundMargin = 80;
    this.gameSpeed = 0;
    this.maxGameSpeed = 6;

    this.player = new Player(this);
    this.input = new InputHander();
    this.background = new Background(this);
    console.log(this);
  }
  update(deltaTime) {
    this.background.update();
    this.player.update(this.input.keys, deltaTime);
  }
  draw(ctx) {
    this.background.draw(ctx);
    this.player.draw(ctx);
    this.debugDraw(ctx, this.input.keys);
  }
  debugDraw(ctx, inputKeys) {
    if (inputKeys.includes("d")) {
      this.player.debugDraw(ctx);
    }
  }
}
