import { ELastKeys } from "./input.js";
import { imageObject } from "./player.js";

/**
 * Represents the order of the states[] in the player class.
 */
export const EStates = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
  SITTING_LEFT: 2,
  SITTING_RIGHT: 3,
  RUNNING_LEFT: 4,
  RUNNING_RIGHT: 5,
  JUMPING_LEFT: 6,
  JUMPING_RIGHT: 7,
  FALLING_LEFT: 8,
  FALLING_RIGHT: 9,
};

export const EAnimatioStates = {
  STANDING_LEFT: "STANDING LEFT",
  STANDING_RIGHT: "STANDING RIGHT",
  SITTING_LEFT: "SITTING LEFT",
  SITTING_RIGHT: "SITTING RIGHT",
  RUNNING_RIGHT: "RUNNING RIGHT",
  RUNNING_LEFT: "RUNNING LEFT",
  JUMPING_RIGHT: "JUMPING RIGHT",
  JUMPING_LEFT: "JUMPING LEFT",
  FALLING_RIGHT: "FALLING RIGHT",
  FALLING_LEFT: "FALLING LEFT",
  // ATTACKING_RIGHT: "ATTACKING RIGHT",
  // ATTACKING_LEFT: "ATTACKING LEFT",
};

class State {
  constructor(state) {
    this.state = state;
  }
  enter() {
    this.player.frameX = 0;
  }
}

// Standing state
export class StandingLeft extends State {
  constructor(player) {
    super(EAnimatioStates.STANDING_LEFT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.StandingLeft.frameY;
    this.player.maxFrame = imageObject.movements.StandingLeft.maxFrame;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_RIGHT) this.player.setState(EStates.RUNNING_RIGHT);
    if (input.lastKey === ELastKeys.PRESS_LEFT && !this.player.onLeftWall())
      this.player.setState(EStates.RUNNING_LEFT);
    if (input.lastKey === ELastKeys.PRESS_DOWN) this.player.setState(EStates.SITTING_LEFT);
    if (input.lastKey === ELastKeys.PRESS_UP) this.player.setState(EStates.JUMPING_LEFT);
  }
}
export class StandingRight extends State {
  constructor(player) {
    super(EAnimatioStates.STANDING_RIGHT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.StandingRight.frameY;
    this.player.maxFrame = imageObject.movements.StandingRight.maxFrame;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_LEFT) this.player.setState(EStates.RUNNING_LEFT);
    if (input.lastKey === ELastKeys.PRESS_RIGHT && !this.player.onRightWall())
      this.player.setState(EStates.RUNNING_RIGHT);
    if (input.lastKey === ELastKeys.PRESS_DOWN) this.player.setState(EStates.SITTING_RIGHT);
    if (input.lastKey === ELastKeys.PRESS_UP) this.player.setState(EStates.JUMPING_RIGHT);
  }
}

// Sitting state
export class SittingLeft extends State {
  constructor(player) {
    super(EAnimatioStates.SITTING_LEFT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.SittingLeft.frameY;
    this.player.maxFrame = imageObject.movements.SittingLeft.maxFrame;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_RIGHT) this.player.setState(EStates.SITTING_RIGHT);
    if (input.lastKey === ELastKeys.RELEAS_DOWN) this.player.setState(EStates.STANDING_LEFT);
  }
}
export class SittingRight extends State {
  constructor(player) {
    super(EAnimatioStates.SITTING_RIGHT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.SittingRight.frameY;
    this.player.maxFrame = imageObject.movements.SittingRight.maxFrame;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_LEFT) this.player.setState(EStates.SITTING_LEFT);
    if (input.lastKey === ELastKeys.RELEAS_DOWN) this.player.setState(EStates.STANDING_RIGHT);
  }
}

// Running state
export class RunningLeft extends State {
  constructor(player) {
    super(EAnimatioStates.RUNNING_LEFT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.RunningLeft.frameY;
    this.player.maxFrame = imageObject.movements.RunningLeft.maxFrame;
    this.player.speed = -this.player.maxSpeed;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_RIGHT) this.player.setState(EStates.RUNNING_RIGHT);
    if (input.lastKey === ELastKeys.PRESS_DOWN) this.player.setState(EStates.SITTING_LEFT);
    if (
      (input.lastKey === ELastKeys.PRESS_LEFT && this.player.onLeftWall()) ||
      input.lastKey === ELastKeys.RELEAS_LEFT
    )
      this.player.setState(EStates.STANDING_LEFT);
  }
}
export class RunningRight extends State {
  constructor(player) {
    super(EAnimatioStates.RUNNING_RIGHT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.RunningRight.frameY;
    this.player.maxFrame = imageObject.movements.RunningRight.maxFrame;
    this.player.speed = this.player.maxSpeed;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_LEFT) this.player.setState(EStates.RUNNING_LEFT);
    if (input.lastKey === ELastKeys.PRESS_DOWN) this.player.setState(EStates.SITTING_RIGHT);
    if (
      (input.lastKey === ELastKeys.PRESS_RIGHT && this.player.onRightWall()) ||
      input.lastKey === ELastKeys.RELEAS_RIGHT
    )
      this.player.setState(EStates.STANDING_RIGHT);
  }
}

// Jumping state
export class JumpingLeft extends State {
  constructor(player) {
    super(EAnimatioStates.JUMPING_LEFT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.JumpingLeft.frameY;
    this.player.maxFrame = imageObject.movements.JumpingLeft.maxFrame;
    if (this.player.onGround()) this.player.vy -= this.player.maxJumpHeight;
    this.player.speed = -this.player.maxSpeed * 0.5;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_RIGHT) this.player.setState(EStates.JUMPING_RIGHT);
    if (this.player.isFalling()) this.player.setState(EStates.FALLING_LEFT);
  }
}
export class JumpingRight extends State {
  constructor(player) {
    super(EAnimatioStates.JUMPING_RIGHT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.JumpingRight.frameY;
    this.player.maxFrame = imageObject.movements.JumpingRight.maxFrame;
    if (this.player.onGround()) this.player.vy -= this.player.maxJumpHeight;
    this.player.speed = this.player.maxSpeed * 0.5;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_LEFT) this.player.setState(EStates.JUMPING_LEFT);
    if (this.player.isFalling()) this.player.setState(EStates.FALLING_RIGHT);
  }
}

// Falling state
export class FallingLeft extends State {
  constructor(player) {
    super(EAnimatioStates.FALLING_LEFT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.FallingLeft.frameY;
    this.player.maxFrame = imageObject.movements.FallingLeft.maxFrame;
    this.player.speed = -this.player.maxSpeed * 0.5;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_RIGHT) this.player.setState(EStates.FALLING_RIGHT);
    if (this.player.onGround()) this.player.setState(EStates.STANDING_LEFT);
  }
}
export class FallingRight extends State {
  constructor(player) {
    super(EAnimatioStates.FALLING_RIGHT);
    this.player = player;
  }
  enter() {
    super.enter();
    this.player.frameY = imageObject.movements.FallingRight.frameY;
    this.player.maxFrame = imageObject.movements.FallingRight.maxFrame;
    this.player.speed = this.player.maxSpeed * 0.5;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_LEFT) this.player.setState(EStates.FALLING_LEFT);
    if (this.player.onGround()) this.player.setState(EStates.STANDING_RIGHT);
  }
}
