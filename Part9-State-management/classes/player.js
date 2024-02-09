import { StandingLeft, StandingRight } from "./state.js";

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
const imageObject = {
  id: "dogImage",
  fileName: "dog_left_right_white.png",
  spriteWidth: 200,
  spriteheight: 181.83,
  framesY: [
    { frameX: 0, name: "StandingRight", maxFrame: 7 },
    { frameX: 1, name: "StandingLeft", maxFrame: 7 },
    { frameX: 2, name: "JumpingRight", maxFrame: 7 },
    { frameX: 3, name: "JumpingLeft", maxFrame: 7 },
    { frameX: 4, name: "FallingRight", maxFrame: 7 },
    { frameX: 5, name: "FallingLeft", maxFrame: 7 },
    { frameX: 6, name: "RunningRight", maxFrame: 9 },
    { frameX: 7, name: "RunningLeft", maxFrame: 9 },
    { frameX: 8, name: "SittingRight", maxFrame: 5 },
    { frameX: 9, name: "SittingLeft", maxFrame: 5 },
    { frameX: 10, name: "AttackingRight", maxFrame: 7 },
    { frameX: 11, name: "AttackingLeft", maxFrame: 7 },
  ],
};

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.states = [new StandingLeft(this), new StandingRight(this)];
    this.currentState = this.states[1];

    this.image = document.getElementById(imageObject.id);
    this.width = imageObject.spriteWidth;
    this.height = imageObject.spriteheight;
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight - this.height;

    this.frameX = 0;
    this.frameY = 0;
  }
  draw(ctx) {
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
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
