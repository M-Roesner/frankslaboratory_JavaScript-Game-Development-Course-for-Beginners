import { Enemy } from "./Enemy.js";

export class Spider extends Enemy {
  constructor(game) {
    super(game);
    this.spriteWidth = 310;
    this.spriteHeight = 175;
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = -this.height;

    // worm comes from the index file, which contains the image tag and the id "worm".
    this.image = spider;

    // velocity of ememy
    this.vx = 0;
    this.vy = Math.random() * 0.1 + 0.1;

    this.maxLength = Math.random() * this.game.height;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.y += this.vy * deltaTime;
    if (this.y < -this.height) this.markedForDeletion = true;
    if (this.y > this.maxLength) this.vy *= -1;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, 0);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.stroke();
    super.draw(ctx);
  }
}
