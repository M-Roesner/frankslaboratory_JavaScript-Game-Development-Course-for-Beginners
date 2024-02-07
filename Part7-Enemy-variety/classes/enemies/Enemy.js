export class Enemy {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;

    // animation
    this.animationFrameX = 0;
    this.animationMaxFrame = 5;
    this.animationFrameInterval = 100;
    this.animationFrameTimer = 0;
  }
  update(deltaTime) {
    this.x -= this.vx * deltaTime;

    // marks enemies to be deleted
    if (this.x < -this.width) this.markedForDeletion = true;

    // animation
    if (this.animationFrameTimer > this.animationFrameInterval) {
      if (this.animationFrameX < this.animationMaxFrame) this.animationFrameX++;
      else this.animationFrameX = 0;
      this.animationFrameTimer = 0;
    } else this.animationFrameTimer += deltaTime;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.animationFrameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
