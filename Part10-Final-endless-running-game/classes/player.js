import { EInputKeys } from "./input.js";
import { EStates, Falling, Jumping, Running, Sitting } from "./playerStates.js";

export const imagePlayerObject = {
  imgTagId: "player",
  fileName: "player.png",
  spriteWidth: 100,
  spriteHeight: 91.3,
  movements: {
    Standing: { frameY: 0, maxFrame: 6 },
    Jumping: { frameY: 1, maxFrame: 6 },
    Falling: { frameY: 2, maxFrame: 6 },
    Running: { frameY: 3, maxFrame: 8 },
    Dizzy: { frameY: 4, maxFrame: 10 },
    Sitting: { frameY: 5, maxFrame: 4 },
  },
};

export class Player {
  constructor(game) {
    this.game = game;
    this.width = imagePlayerObject.spriteWidth;
    this.height = imagePlayerObject.spriteHeight;
    this.x = 0;
    this.setOnGround();

    this.image = document.getElementById(imagePlayerObject.imgTagId);
    this.frameX = 0;
    this.frameY = imagePlayerObject.movements.Standing.frameY;
    this.maxFrame = imagePlayerObject.movements.Standing.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;

    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0;
    this.maxJumpHeight = 27;
    this.gravity = 1;

    this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
    this.currenState = this.states[EStates.SITTING];
    this.currenState.enter();
  }
  update(inputKeys, deltaTime) {
    this.checkCollision();
    this.currenState.handleInput(inputKeys);

    // horizontal movement
    this.x += this.speed;
    if (inputKeys.includes(EInputKeys.ARROW_RIGHT)) this.speed = this.maxSpeed;
    else if (inputKeys.includes(EInputKeys.ARROW_LEFT)) this.speed = -this.maxSpeed;
    else this.speed = 0;

    if (this.onLeftWall()) this.x = 0;
    if (this.onRightWall()) this.x = this.game.width - this.width;

    // vertical movement
    this.y += this.vy;

    if (!this.onGround()) this.vy += this.gravity;
    else this.vy = 0;

    // sprite animation
    if (this.frameTimer >= this.frameInterval) {
      this.frameX < this.maxFrame ? this.frameX++ : (this.frameX = 0);
      this.frameTimer = 0;
    } else this.frameTimer += deltaTime;
  }
  draw(ctx) {
    if (this.game.debug) this.debugDraw(ctx);
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  setState(stateNumber, isRunning) {
    this.currenState = this.states[stateNumber];
    this.game.gameSpeed = this.game.maxGameSpeed * isRunning; // isRunning = true === 1 | false === 0
    this.currenState.enter();
  }
  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        // collision detected
        enemy.markedForDeletion = true;
        this.game.score++;
      } else {
        // no collision detected
      }
    });
  }

  // personal methods
  isFalling() {
    return this.vy > this.gravity;
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
  setOnGround() {
    this.y = this.game.height - this.height - this.game.groundMargin;
  }
}
