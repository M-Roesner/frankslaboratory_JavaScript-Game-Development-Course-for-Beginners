export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;

    this.image = document.getElementById("player");
    this.frameX = 0;
    this.maxFrame = 6;

    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0;
    this.maxJumpHeight = 10;
    this.gravity = 1;

    console.log(this.game);
  }
  update(inputKeys) {
    // horizontal movement
    this.x += this.speed;
    if (inputKeys.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (inputKeys.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else this.speed = 0;

    if (this.onLeftWall()) this.x = 0;
    if (this.onRightWall()) this.x = this.game.width - this.width;

    // vertical movement
    if (inputKeys.includes("ArrowUp") && this.onGround()) this.vy -= this.maxJumpHeight;
    this.y += this.vy;

    if (!this.onGround()) this.vy += this.gravity;
    else this.vy = 0;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      0 * this.width,
      0 * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }
  onLeftWall() {
    return this.x <= 0;
  }
  onRightWall() {
    return this.x >= this.game.width - this.width;
  }
  debugDraw(ctx) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
