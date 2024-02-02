/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// width and height comes from the style.css properties
const canvasStyle = window.getComputedStyle(canvas);
const CANVAS_WIDTH = (canvas.width = parseInt(canvasStyle.width)); //800
const CANVAS_HEIGT = (canvas.height = parseInt(canvasStyle.height)); //700
console.log(CANVAS_WIDTH, CANVAS_HEIGT);

const backgroundLayer1 = new Image();
backgroundLayer1.src = "./images/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./images/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./images/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./images/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./images/layer-5.png";

let gameSpeed = 10;
// let gameFrame = 0;

window.addEventListener("load", () => {
  const slider = document.getElementById("slider");
  slider.value = gameSpeed;
  const showGameSpeed = document.getElementById("showGameSpeed");
  showGameSpeed.innerHTML = gameSpeed;

  slider.addEventListener("change", (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
  });

  class Layer {
    constructor(image, speedModifire) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.x2 = this.width;
      this.image = image;
      this.speedModifire = speedModifire;
      this.speed = gameSpeed * this.speedModifire;
    }
    updateOld() {
      this.speed = gameSpeed * this.speedModifire;

      if (this.x <= -this.width) this.x = this.width + this.x2 - this.speed;
      if (this.x2 <= -this.width) this.x2 = this.width + this.x - this.speed;

      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed);
    }
    drawOld() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
    // The commented out code jumps a bit, so I kept the old code!
    update() {
      this.speed = gameSpeed * this.speedModifire;
      if (this.x <= -this.width) this.x = 0;
      this.x = Math.floor(this.x - this.speed);

      // this.x = (gameFrame * this.speed) % this.width;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
  }

  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);

  const gameLayers = [layer1, layer2, layer3, layer4, layer5];

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGT);
    gameLayers.forEach((layer) => {
      layer.update();
      layer.draw();
    });
    // gameFrame--;
    requestAnimationFrame(animate);
  };

  animate();
});
