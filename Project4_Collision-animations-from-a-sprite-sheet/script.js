/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// The width and height of the canvas are automatically obtained from the style.css properties.
const canvasStyle = window.getComputedStyle(canvas);
const CANVAS_WIDTH = (canvas.width = parseInt(canvasStyle.width));
const CANVAS_HEIGT = (canvas.height = parseInt(canvasStyle.height));
console.log(`Canvas width: ${CANVAS_WIDTH}, Canvas height: ${CANVAS_HEIGT}`);
let canvasPosition = canvas.getBoundingClientRect();

const explosions = [];

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;

    this.image = new Image();
    this.image.src = "./images/boom.png";

    this.sound = new Audio();
    this.sound.src = "./audio/wind.wav";

    this.frame = 0;
    this.timer = 0;

    this.angle = Math.random() * 6.2;
  }

  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 10 === 0) this.frame++;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
const createAnimation = (e) => {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY));
};

window.addEventListener("click", (e) => {
  createAnimation(e);
  console.log(explosions);
});
// window.addEventListener("mousemove", (e) => {
//   createAnimation(e);
// });

window.addEventListener("load", () => {
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < explosions.length; i++) {
      explosions[i].update();
      explosions[i].draw();
      if (explosions[i].frame > 5) {
        explosions.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(animate);
  };
  animate();
});
