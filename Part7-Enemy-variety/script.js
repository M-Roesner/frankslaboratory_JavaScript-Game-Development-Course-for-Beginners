/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// The width and height of the canvas are automatically obtained from the style.css properties.
const canvasStyle = window.getComputedStyle(canvas);
const CANVAS_WIDTH = (canvas.width = parseInt(canvasStyle.width));
const CANVAS_HEIGT = (canvas.height = parseInt(canvasStyle.height));
console.log(`Canvas width: ${CANVAS_WIDTH}, Canvas height: ${CANVAS_HEIGT}`);
window.addEventListener("load", () => {
  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;

      this.enemies = [];
      this.enemyInterval = 100;
      this.enemyTimer = 0;
      this.enemyTypes = ["worm", "ghost", "spider"];
    }
    update(deltaTime) {
      // removes enemies wich are out of the screen
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

      // adds new enemies every 1000ms
      if (this.enemyTimer >= this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else this.enemyTimer += deltaTime;

      this.enemies.forEach((enemy) => enemy.update(deltaTime));

      console.log(this.enemies);
    }
    draw() {
      this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    }
    #addNewEnemy() {
      // adds randomly enemies to the game, depending on the length of the enemyTypes.
      const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
      switch (randomEnemy) {
        case "worm":
          this.enemies.push(new Worm(this));
          break;
        case "ghost":
          this.enemies.push(new Ghost(this));
          break;
        case "spider":
          this.enemies.push(new Spider(this));
          break;
      }

      // sorts the enemies by y-coordinate if i added a new enemy
      // this.enemies.sort((a, b) => a.y - b.y);
    }
  }
  class Enemy {
    constructor(game) {
      this.game = game;
      this.markedForDeletion = false;

      // animation
      this.animationFrameX = 0;
      this.animationMaxFrame = 5;
      this.animationFrameInterval = 100;
      this.animationFrameTimer = 0;
    }
    update(deltaTime) {
      this.x -= this.vx * deltaTime;

      // marks enemies to be deleted
      if (this.x < -this.width) this.markedForDeletion = true;

      // animation
      if (this.animationFrameTimer > this.animationFrameInterval) {
        if (this.animationFrameX < this.animationMaxFrame) this.animationFrameX++;
        else this.animationFrameX = 0;
        this.animationFrameTimer = 0;
      } else this.animationFrameTimer += deltaTime;
    }
    draw(ctx) {
      ctx.drawImage(
        this.image,
        this.animationFrameX * this.spriteWidth,
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

  class Worm extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 229;
      this.spriteHeight = 171;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.5;
      this.x = this.game.width;
      this.y = this.game.height - this.height;

      // worm comes from the index file, which contains the image tag and the id "worm".
      this.image = worm;

      // velocity of ememy
      this.vx = Math.random() * 0.1 + 0.1;
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 261;
      this.spriteHeight = 209;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.5;
      this.x = this.game.width;
      this.y = Math.random() * (this.game.height * 0.6);

      // ghost comes from the index file, which contains the image tag and the id "ghost".
      this.image = ghost;

      // velocity of ememy
      this.vx = Math.random() * 0.2 + 0.1;

      // animation of the y-axis
      this.angle = 0;
      this.curve = Math.random() * 3;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = 0.5;
      super.draw(ctx);
      ctx.restore();
    }
  }

  class Spider extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 310;
      this.spriteHeight = 175;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.5;
      this.x = Math.random() * (this.game.width - this.width);
      this.y = -this.height;

      // worm comes from the index file, which contains the image tag and the id "worm".
      this.image = spider;

      // velocity of ememy
      this.vx = 0;
      this.vy = Math.random() * 0.1 + 0.1;

      this.maxLength = Math.random() * this.game.height;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += this.vy * deltaTime;
      if (this.y < -this.height) this.markedForDeletion = true;
      if (this.y > this.maxLength) this.vy *= -1;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 2, 0);
      ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
      ctx.stroke();
      super.draw(ctx);
    }
  }

  const game = new Game(ctx, canvas.width, canvas.height);
  let lastTime = 0;
  const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
  };
  animate(0);
});
