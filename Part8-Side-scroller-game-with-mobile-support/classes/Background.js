/** @type {HTMLCanvasElement} */

export class Background {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 720;

    this.image = document.getElementById("backgroundImage");

    this.speed = 5;
  }
  update() {
    this.x -= this.speed;
    if (this.x < -this.width) this.x = 0;
  }
  draw(ctx) {
    // background image 1
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    // background image 1 one image later
    ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
  }
  restart() {
    this.x = 0;
  }
}
