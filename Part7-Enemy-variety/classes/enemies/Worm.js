import { Enemy } from "./Enemy.js";

export class Worm extends Enemy {
  constructor(game) {
    super(game);
    this.spriteWidth = 229;
    this.spriteHeight = 171;
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    this.x = this.game.width;
    this.y = this.game.height - this.height;

    // worm comes from the index file, which contains the image tag and the id "worm".
    this.image = worm;

    // velocity of ememy
    this.vx = Math.random() * 0.1 + 0.1;
  }
  // update(deltaTime) {
  //   super.update(deltaTime);
  // }
  // draw(ctx) {
  //   super.draw(ctx);
  // }
}
