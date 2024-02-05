class Enemy {
  constructor() {
    this.image = new Image();

    this.spriteWidth;
    this.spriteHeight;
    this.width;
    this.height;
    this.x;
    this.y;
  }
  update() {}
  draw() {
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {canvasContext2D} ctx
 * @param {number} gameFrame
 * @param {string} imagePath
 */
export class FlyingWiggleEnemy extends Enemy {
  constructor(canvas, ctx, imagePath) {
    super();
    this.canvas = canvas;
    this.ctx = ctx;

    this.image.src = imagePath; //"./images/enemy1.png";

    // this.speed = Math.random() * 4 - 2; // result = -2 to +2
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (this.canvas.width - this.width);
    this.y = Math.random() * (this.canvas.height - this.height);

    // animation values
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1); // result = 1 to 3
  }

  checkCollisions() {
    if (this.x < 0) this.x = 0;
    if (this.x > this.canvas.width - this.width) this.x = this.canvas.width - this.width;
    if (this.y < 0) this.y = 0;
    if (this.y > this.canvas.height - this.height) this.y = this.canvas.height - this.height;
  }

  update(gameFrame) {
    // this.x += this.speed;
    // this.y += this.speed;
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;

    // check collision with canvas sizes (own funcionality)
    this.checkCollisions();

    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    // ctx.drawImage(imagaSrc, sx, sy, sw, sh, dx, dy, dw, dh);
    this.ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
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

/**
 * @param {HTMLCanvasElement} canvas
 * @param {canvasContext2D} ctx
 * @param {number} gameFrame
 * @param {string} imagePath
 */
export class FlyingSwingingEnemy extends Enemy {
  constructor(canvas, ctx, imagePath) {
    super();
    this.canvas = canvas;
    this.ctx = ctx;

    this.image.src = imagePath; //"./images/enemy2.png";

    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (this.canvas.width - this.width);
    this.y = Math.random() * (this.canvas.height - this.height);

    // animation values
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);

    // angle movement for y axis
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.angleCurve = Math.random() * 5;
  }

  update(gameFrame) {
    this.x -= this.speed;
    this.y += this.angleCurve * Math.sin(this.angle);
    this.angle += this.angleSpeed;

    // collision with canvas sizes
    if (this.x + this.width < 0) this.x = this.canvas.width;

    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    // ctx.drawImage(imagaSrc, sx, sy, sw, sh, dx, dy, dw, dh);
    this.ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
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

/**
 * @param {HTMLCanvasElement} canvas
 * @param {canvasContext2D} ctx
 * @param {number} gameFrame
 * @param {string} imagePath
 */
export class FlyingCircleEnemy extends Enemy {
  constructor(canvas, ctx, imagePath) {
    super();
    this.canvas = canvas;
    this.ctx = ctx;

    this.image.src = imagePath;

    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (this.canvas.width - this.width);
    this.y = Math.random() * (this.canvas.height - this.height);

    // animation values
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);

    // angle movement for y axis
    this.angle = 0;
    this.angleSpeed = 0.5 + Math.random() * 2;
    this.angleCurve = 50 + Math.random() * 200;
  }

  update(gameFrame) {
    // descriptions/angle_sin_cos-description-grafic.png

    // circle movements
    // this.x =
    //   this.angleCurve * Math.sin((this.angle * Math.PI) / 180) +
    //   (this.canvas.width / 2 - this.width / 2);
    // this.y =
    //   this.angleCurve * Math.cos((this.angle * Math.PI) / 180) +
    //   (this.canvas.height / 2 - this.height / 2);

    // special test movements
    this.x =
      (this.canvas.width / 2 - this.width / 2) * Math.cos((this.angle * Math.PI) / 90) +
      (this.canvas.width / 2 - this.width / 2);
    this.y =
      (this.canvas.height / 2 - this.height / 2) * Math.sin((this.angle * Math.PI) / 270) +
      (this.canvas.height / 2 - this.height / 2);
    this.angle += this.angleSpeed;

    // collsion with canvas sizes
    if (this.x + this.width < 0) this.x = this.canvas.width;

    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    // ctx.drawImage(imagaSrc, sx, sy, sw, sh, dx, dy, dw, dh);
    this.ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
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

/**
 * @param {HTMLCanvasElement} canvas
 * @param {canvasContext2D} ctx
 * @param {number} gameFrame
 * @param {string} imagePath
 */
export class FlyingSawEnemy extends Enemy {
  constructor(canvas, ctx, imagePath) {
    super();
    this.canvas = canvas;
    this.ctx = ctx;

    this.image.src = imagePath;

    this.speed = Math.random() * 5 + 1;
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (this.canvas.width - this.width);
    this.y = Math.random() * (this.canvas.height - this.height);
    this.newX = Math.random() * (this.canvas.width - this.width);
    this.newY = Math.random() * (this.canvas.height - this.height);

    this.dx;
    this.dy;

    // animation values
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);

    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update(gameFrame) {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (this.canvas.width - this.width);
      this.newY = Math.random() * (this.canvas.height - this.height);
    }
    this.dx = this.x - this.newX;
    this.dy = this.y - this.newY;
    this.x -= this.dx / 20;
    this.y -= this.dy / 20;

    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    // ctx.drawImage(imagaSrc, sx, sy, sw, sh, dx, dy, dw, dh);
    this.ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
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
