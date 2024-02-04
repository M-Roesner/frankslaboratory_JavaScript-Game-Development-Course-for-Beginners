/** @type {HTMLCanvasElement} */
import {
  FlyingWiggleEnemy,
  FlyingEnemy,
  FlyingCircleEnemy,
  FlyingSawEnemy,
} from "./Classes/enemies/Enemies.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// The width and height of the canvas are automatically obtained from the style.css properties.
const canvasStyle = window.getComputedStyle(canvas);
const CANVAS_WIDTH = (canvas.width = parseInt(canvasStyle.width));
const CANVAS_HEIGT = (canvas.height = parseInt(canvasStyle.height));
console.log(`Canvas width: ${canvas.width}, Canvas height: ${canvas.height}`);

const numberOfEnemies = 100;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./images/enemy4.png";

    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.newX = Math.random() * canvas.width;
    this.newY = Math.random() * canvas.height;

    // animation values
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);

    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update() {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 20;
    this.y -= dy / 20;

    // collision with canvas sizes
    if (this.x + this.width < 0) this.x = canvas.width;

    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    // ctx.drawImage(imagaSrc, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(
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

window.addEventListener("load", () => {
  for (let i = 0; i < numberOfEnemies; i++) {
    // enemiesArray.push(new FlyingWiggleEnemy(canvas, ctx, gameFrame, "./images/enemy1.png"));
    enemiesArray.push(new FlyingEnemy(canvas, ctx, gameFrame, "./images/enemy2.png"));
    // enemiesArray.push(new FlyingCircleEnemy(canvas, ctx, gameFrame, "./images/enemy3.png"));
    // enemiesArray.push(new FlyingSawEnemy(canvas, ctx, gameFrame, "./images/enemy4.png"));
    // enemiesArray.push(new Enemy());
  }

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGT);
    enemiesArray.forEach((enemy) => {
      enemy.update();
      enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
  };
  animate();
});
