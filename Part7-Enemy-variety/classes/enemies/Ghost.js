import { Enemy } from "./Enemy.js";

export class Ghost extends Enemy {
  constructor(game) {
    super(game);
    this.spriteWidth = 261;
    this.spriteHeight = 209;
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    this.x = this.game.width;
    this.y = Math.random() * (this.game.height * 0.6);

    // ghost comes from the index file, which contains the image tag and the id "ghost".
    this.image = ghost;

    // velocity of ememy
    this.vx = Math.random() * 0.2 + 0.1;

    // animation of the y-axis
    this.angle = 0;
    this.curve = Math.random() * 3;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.y += Math.sin(this.angle) * this.curve;
    this.angle += 0.04;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    super.draw(ctx);
    ctx.restore();
  }
}
