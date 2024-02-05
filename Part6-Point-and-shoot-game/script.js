/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(`Canvas width: ${canvas.width}, Canvas height: ${canvas.height}`);

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
let gameOver = false;
ctx.font = "50px Impact";

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];

class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizesModifier = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizesModifier;
    this.height = this.spriteHeight * this.sizesModifier;

    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);

    this.image = new Image();
    this.image.src = "./images/raven.png";

    // The color is used to check whether it is the right raven.
    this.randomColor = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color =
      "rgb(" + this.randomColor[0] + "," + this.randomColor[1] + "," + this.randomColor[2] + ")";

    // movement
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;

    // out of view
    this.markedForDeletion = false;

    // animation
    this.animationSpriteFrame = 0;
    this.animationMaxSpriteFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;

    // drawn a partical path behind the raven
    this.hasTrail = Math.random() > 0.5; // 50% true or false
  }

  update(deltaTime) {
    // movement
    if (this.y > canvas.height - this.height || this.y < 0) this.directionY *= -1;
    this.x -= this.directionX;
    this.y -= this.directionY;

    // destroy and game over
    if (this.x < 0 - this.width) {
      this.markedForDeletion = true;
      gameOver = true;
    }

    // sprite animation
    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap >= this.flapInterval) {
      this.animationSpriteFrame > this.animationMaxSpriteFrame
        ? (this.animationSpriteFrame = 0)
        : this.animationSpriteFrame++;
      this.timeSinceFlap = 0;
      if (this.hasTrail) {
        for (let i = 0; i < 5; i++) {
          particles.push(new Particle(this.x, this.y, this.width, this.color));
        }
      }
    }
  }
  draw() {
    collisionCtx.fillStyle = this.color;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.animationSpriteFrame * this.spriteWidth,
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

let explosions = [];
class Explosion {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;

    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = size;
    this.height = (size * this.spriteHeight) / this.spriteWidth;

    this.image = new Image();
    this.image.src = "./images/boom.png";

    this.sound = new Audio();
    this.sound.src = "./audios/wind.wav";

    this.frame = 0;

    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;

    this.markedForDeletion = false;
  }

  update(deltaTime) {
    if (this.frame === 0) this.sound.play();
    this.timeSinceLastFrame += deltaTime;
    if (this.timeSinceLastFrame >= this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > 5) this.markedForDeletion = true;
    }
  }
  draw() {
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

let particles = [];
class Particle {
  constructor(x, y, size, color) {
    this.size = size;
    this.x = x + this.size / 2 + Math.random() * 50 - 25;
    this.y = y + this.size / 3 + Math.random() * 50 - 25;
    this.radius = (Math.random() * this.size) / 10;
    this.maxRadius = Math.random() * 20 + 35;
    this.markedForDeletion = false;
    this.speedX = Math.random() * 1 + 0.5;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.radius += 0.5;
    if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

const drawScore = () => {
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 50, 75);
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 55, 80);
};

const drawGameOver = () => {
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText("GAME OVER, your score is " + score, canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER, your score is " + score, canvas.width / 2 + 5, canvas.height / 2 + 5);
};

window.addEventListener("click", (e) => {
  const detectionPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
  // console.log(detectionPixelColor);
  const pc = detectionPixelColor.data;
  ravens.forEach((object) => {
    if (
      object.randomColor[0] === pc[0] &&
      object.randomColor[1] === pc[1] &&
      object.randomColor[2] === pc[2]
    ) {
      // collotion detected
      object.markedForDeletion = true;
      score++;
      explosions.push(new Explosion(object.x, object.y, object.width));
      console.log(explosions);
    }
  });
});

window.addEventListener("load", () => {
  const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    if (timeToNextRaven >= ravenInterval) {
      ravens.push(new Raven());
      timeToNextRaven = 0;
      ravens.sort((a, b) => a.width - b.width);
      console.log(ravens);
    }

    drawScore();
    [...particles, ...ravens, ...explosions].forEach((object) => {
      object.update(deltaTime);
    });
    [...particles, ...ravens, ...explosions].forEach((object) => {
      object.draw();
    });
    ravens = ravens.filter((object) => !object.markedForDeletion);
    explosions = explosions.filter((object) => !object.markedForDeletion);
    particles = particles.filter((object) => !object.markedForDeletion);
    if (!gameOver) requestAnimationFrame(animate);
    else drawGameOver();
  };
  animate(0);
});
