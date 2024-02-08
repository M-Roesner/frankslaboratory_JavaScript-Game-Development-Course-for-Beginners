export class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.spriteWidth = 200;
    this.spriteHeight = 200;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = 100;
    this.y = this.gameHeight - this.height;
    this.collisionX = this.x + this.width / 2;
    this.collisionY = this.y + this.height / 2 + 20;
    this.collisionRadius = this.width / 3;

    this.image = document.getElementById("playerImage");
    this.frameX = 0;
    this.maxFrame = 8;
    this.frameY = 0;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;

    this.speed = 0;
    this.vy = 0;
    this.weight = 1;
  }
  update(input, deltaTime, enemies) {
    let isGameover = false;
    // collision detection with circles
    enemies.forEach((enemy) => {
      const dx = enemy.collisionX - this.collisionX;
      const dy = enemy.collisionY - this.collisionY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < enemy.collisionRadius + this.collisionRadius) isGameover = true;
    });

    // sprite animation
    if (this.frameTimer >= this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameTimer = 0;
    } else this.frameTimer += deltaTime;

    // controles with keys and touch
    if (input.keys.indexOf("ArrowRight") > -1) this.speed = 5;
    else if (input.keys.indexOf("ArrowLeft") > -1) this.speed = -5;
    else if (
      (input.keys.indexOf("ArrowUp") > -1 || input.keys.indexOf("swipe up") > -1) &&
      this.#onGround()
    )
      this.vy -= 32;
    else this.speed = 0;

    // horizontal movements
    this.x += this.speed;
    if (this.x < 0) this.x = 0;
    if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
    this.collisionX = this.x + this.width / 2;

    // vertical movements
    this.y += this.vy;
    if (!this.#onGround()) {
      this.vy += this.weight;
      this.maxFrame = 5;
      this.frameY = 1;
    } else {
      this.vy = 0;
      this.maxFrame = 8;
      this.frameY = 0;
    }
    if (this.y >= this.gameHeight - this.height) this.y = this.gameHeight - this.height;
    this.collisionY = this.y + this.height / 2 + 20;

    return isGameover;
  }
  #onGround() {
    return this.y >= this.gameHeight - this.height;
  }

  draw(ctx, debugmode) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
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
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
  restart() {
    this.x = 100;
    this.y = this.gameHeight - this.height;
    this.frameX = 0;
    this.maxFrame = 8;
  }
}
