import { InputHander } from "./input.js";
import { Player } from "./player.js";

export class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth;
    this.height = gameHeight;
    this.groundMargin = 50;
    this.player = new Player(this);
    this.input = new InputHander();
    console.log(this);
  }
  update(deltaTime) {
    this.player.update(this.input.keys, deltaTime);
  }
  draw(ctx) {
    this.player.draw(ctx);
    this.debugDraw(ctx, this.input.keys);
  }
  debugDraw(ctx, inputKeys) {
    if (inputKeys.includes("d")) {
      this.player.debugDraw(ctx);
    }
  }
}
