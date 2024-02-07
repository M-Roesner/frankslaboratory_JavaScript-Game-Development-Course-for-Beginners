/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const canvasStyle = window.getComputedStyle(canvas);
canvas.width = 800;
canvas.height = 720;
console.log(`Canvas width: ${canvas.width}, Canvas height: ${canvas.height}`);

let enemies = [];
let score = 0;
let gameOver = false;

let debugmode = true;
window.addEventListener("keydown", (e) => {
  if (e.key === "d") debugmode = !debugmode;
});
const debugDraw = (collisionX, collisionY, width) => {
  ctx.save();
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.arc(collisionX, collisionY, width / 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
};

window.addEventListener("load", () => {
  class InputHandler {
    constructor() {
      this.keys = [];
      // this.keys.indexOf(e.key):
      // Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        )
          this.keys.push(e.key);
      });
      window.addEventListener("keyup", (e) => {
        // .splice() removes the value from the array.
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        )
          this.keys.splice(this.keys.indexOf(e.key), 1);
      });
    }
    update(deltaTime) {}
    draw() {}
  }
  class Player {
    constructor(gameWidth, gameHeight, enemies) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.enemies = enemies;

      this.spriteWidth = 200;
      this.spriteHeight = 200;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = 10;
      this.y = this.gameHeight - this.height;
      this.collisionX = this.x + this.width / 2;
      this.collisionY = this.y + this.height / 2;

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
      // collision detection
      enemies.forEach((enemy) => {
        const dx = enemy.collisionX - this.collisionX;
        const dy = enemy.collisionY - this.collisionY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < enemy.width / 2 + this.width / 2) {
          gameOver = true;
        }
      });

      // sprite animation
      if (this.frameTimer >= this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else this.frameTimer += deltaTime;

      // controles
      if (input.keys.indexOf("ArrowRight") > -1) this.speed = 5;
      else if (input.keys.indexOf("ArrowLeft") > -1) this.speed = -5;
      else if (input.keys.indexOf("ArrowUp") > -1 && this.#onGround()) this.vy -= 30;
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
      this.collisionY = this.y + this.height / 2;
    }
    #onGround() {
      return this.y >= this.gameHeight - this.height;
    }

    draw(ctx) {
      if (debugmode) debugDraw(this.collisionX, this.collisionY, this.width);

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
    }
  }
  class Background {
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
  }

  class Enemy {
    /** @type {HTMLCanvasElement} */
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.spriteWidth = 160;
      this.spriteHeight = 119;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;

      this.x = this.gameWidth - this.width;
      this.y = this.gameHeight - this.height;
      this.collisionX = this.x + this.width / 2;
      this.collisionY = this.y + this.height / 2;

      this.image = document.getElementById("enemyImage");
      this.frameX = 0;
      this.maxFrame = 5;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;

      this.speed = 8;

      this.markedForDeletion = false;
    }
    update(deltaTime) {
      // handle animation
      if (this.frameTimer >= this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else this.frameTimer += deltaTime;

      // speed
      this.x -= this.speed;
      this.collisionX = this.x + this.width / 2;

      // remove enemy if not displayed and increase score
      if (this.x < -this.width) {
        this.markedForDeletion = true;
        score++;
      }
    }
    draw(ctx) {
      if (debugmode) debugDraw(this.collisionX, this.collisionY, this.width);

      // drawing
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
    }
  }

  const handleEnemies = (deltaTime) => {
    // create a new enemy
    if (enemyTimer > enemyIntervall + randomEnemyIntervall) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      enemyTimer = 0;
    } else enemyTimer += deltaTime;

    // update and draw the enemies
    enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      enemy.draw(ctx);
    });

    // remove enemies
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
  };

  const displayStatusText = (ctx) => {
    // There is a shadow function, but the performance will be bad,
    // so it is drawn in a different way.
    ctx.font = "40px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 20, 50);
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 22, 52);

    if (gameOver) {
      ctx.textAlign = "center";
      ctx.fillStyle = "black";
      ctx.fillText("Game Over, try again", canvas.width / 2, canvas.height / 2);
      ctx.fillStyle = "white";
      ctx.fillText("Game Over, try again", canvas.width / 2 + 2, canvas.height / 2 + 2);
    }
  };

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  let lastTime = 0;
  let enemyTimer = 0;
  const enemyIntervall = 1000;
  const randomEnemyIntervall = Math.random() * 1000 + 500;
  const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    background.update();
    background.draw(ctx);
    player.update(input, deltaTime, enemies);
    player.draw(ctx);

    handleEnemies(deltaTime);
    displayStatusText(ctx);

    if (!gameOver) requestAnimationFrame(animate);
  };
  animate(0);
});
