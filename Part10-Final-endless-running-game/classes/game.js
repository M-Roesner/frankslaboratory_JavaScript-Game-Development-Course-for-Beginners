import { InputHander } from "./input.js";
import { Player } from "./player.js";

export class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth;
    this.height = gameHeight;
    this.player = new Player(this);
    this.input = new InputHander();
    console.log(this);
  }
  update() {}
  draw(ctx) {
    this.player.update(this.input.keys);
    this.player.draw(ctx);
  }
}
