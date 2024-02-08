export class Enemy {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.spriteWidth = 160;
    this.spriteHeight = 119;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;

    this.x = this.gameWidth;
    this.y = this.gameHeight - this.height;
    this.collisionX = this.x + this.width / 2 - 20;
    this.collisionY = this.y + this.height / 2;
    this.collisionRadius = this.width / 3;

    this.image = document.getElementById("enemyImage");
    this.frameX = 0;
    this.maxFrame = 5;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;

    this.speed = 8;

    this.markedForDeletion = false;
  }
  update(deltaTime, score) {
    // handle animation
    if (this.frameTimer >= this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameTimer = 0;
    } else this.frameTimer += deltaTime;

    // speed
    this.x -= this.speed;
    this.collisionX = this.x + this.width / 2 - 25;

    // remove enemy if not displayed and increase score
    if (this.x < -this.width) {
      this.markedForDeletion = true;
      score++;
    }
    return score;
  }
  draw(ctx, debugmode) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (debugmode) {
      ctx.save();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "blue";
      ctx.beginPath();
      ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
}
