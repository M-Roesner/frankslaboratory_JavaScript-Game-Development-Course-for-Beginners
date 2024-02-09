import {
  FallingLeft,
  FallingRight,
  JumpingLeft,
  JumpingRight,
  RunningLeft,
  RunningRight,
  SittingLeft,
  SittingRight,
  StandingLeft,
  StandingRight,
} from "./state.js";

/**
 * How does this state work?
 * The image file (dog_left_right_white.png) contains rows, each row represents a state
 * and each column the animation of the state.
 *
 * "this.states" contains the states and each state is a class.
 *
 * The order is important and this comes from the image file.
 * The imageObject resprates the states.
 */
export const imageObject = {
  id: "dogImage",
  fileName: "dog_left_right_white.png",
  spriteWidth: 200,
  spriteheight: 181.83,
  movements: {
    StandingRight: { frameY: 0, maxFrame: 6 },
    StandingLeft: { frameY: 1, maxFrame: 6 },
    JumpingRight: { frameY: 2, maxFrame: 6 },
    JumpingLeft: { frameY: 3, maxFrame: 6 },
    FallingRight: { frameY: 4, maxFrame: 6 },
    FallingLeft: { frameY: 5, maxFrame: 6 },
    RunningRight: { frameY: 6, maxFrame: 8 },
    RunningLeft: { frameY: 7, maxFrame: 8 },
    SittingRight: { frameY: 8, maxFrame: 4 },
    SittingLeft: { frameY: 9, maxFrame: 4 },
    AttackingRight: { frameY: 10, maxFrame: 6 },
    AttackingLeft: { frameY: 11, maxFrame: 6 },
  },
};

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.states = [
      new StandingLeft(this),
      new StandingRight(this),
      new SittingLeft(this),
      new SittingRight(this),
      new RunningLeft(this),
      new RunningRight(this),
      new JumpingLeft(this),
      new JumpingRight(this),
      new FallingLeft(this),
      new FallingRight(this),
    ];
    this.currentState = this.states[1];

    this.image = document.getElementById(imageObject.id);
    this.width = imageObject.spriteWidth;
    this.height = imageObject.spriteheight;
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight - this.height;

    this.frameX = 0;
    this.frameY = 0;
    this.fps = 30;
    this.maxFrame = 6;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;

    this.speed = 0;
    this.maxSpeed = 10;
    this.maxJumpHeight = 40;
    this.vy = 0;
    this.weight = 1; // gravity
  }
  draw(ctx, deltaTime) {
    if (this.frameX < this.maxFrame) {
      if (this.frameTimer >= this.frameInterval) {
        this.frameX++;
        this.frameTimer = 0;
      } else this.frameTimer += deltaTime;
    } else this.frameX = 0;

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
  update(input) {
    this.currentState.handleInput(input);

    // horizontal movement
    this.x += this.speed;
    if (this.x <= 0) this.x = 0;
    if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;

    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    if (this.onGround()) this.y = this.gameHeight - this.height;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
  isFalling() {
    return this.vy === 0;
  }
}
