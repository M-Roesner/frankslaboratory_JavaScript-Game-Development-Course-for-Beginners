import { EInputKeys } from "./input.js";
import { imagePlayerObject } from "./player.js";

/**
 * Represents the order of the states[] in the player class.
 */
export const EStates = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
};

export const EAnimatioStates = {
  SITTING: "SITTING",
  RUNNING: "RUNNING",
  JUMPING: "JUMPING",
  FALLING: "FALLING",
  ROLLING: "ROLLING",
  DIVING: "DIVING",
  HIT: "HIT",
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Sitting extends State {
  constructor(player) {
    super(EAnimatioStates.SITTING);
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = imagePlayerObject.movements.Sitting.frameY;
    this.player.maxFrame = imagePlayerObject.movements.Sitting.maxFrame;
  }
  handleInput(inputKeys) {
    if (inputKeys.includes(EInputKeys.ARROW_LEFT) || inputKeys.includes(EInputKeys.ARROW_RIGHT)) {
      this.player.setState(EStates.RUNNING, 1);
    } else if (inputKeys.includes(EInputKeys.ENTER)) {
      this.player.setState(EStates.ROLLING, 2);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super(EAnimatioStates.RUNNING);
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = imagePlayerObject.movements.Running.frameY;
    this.player.maxFrame = imagePlayerObject.movements.Running.maxFrame;
  }
  handleInput(inputKeys) {
    if (inputKeys.includes(EInputKeys.ARROW_DOWN)) {
      this.player.setState(EStates.SITTING, 0);
    } else if (inputKeys.includes(EInputKeys.ARROW_UP)) {
      this.player.setState(EStates.JUMPING, 1);
    } else if (inputKeys.includes(EInputKeys.ENTER)) {
      this.player.setState(EStates.ROLLING, 2);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super(EAnimatioStates.JUMPING);
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = imagePlayerObject.movements.Jumping.frameY;
    this.player.maxFrame = imagePlayerObject.movements.Jumping.maxFrame;
    if (this.player.onGround()) this.player.vy -= this.player.maxJumpHeight;
  }
  handleInput(inputKeys) {
    if (this.player.isFalling()) {
      this.player.setState(EStates.FALLING, 1);
    } else if (inputKeys.includes(EInputKeys.ENTER)) {
      this.player.setState(EStates.ROLLING, 2);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super(EAnimatioStates.FALLING);
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = imagePlayerObject.movements.Falling.frameY;
    this.player.maxFrame = imagePlayerObject.movements.Falling.maxFrame;
  }
  handleInput(inputKeys) {
    if (this.player.onGround()) {
      this.player.setState(EStates.RUNNING, 1);
    }
  }
}

export class Rolling extends State {
  constructor(player) {
    super(EAnimatioStates.ROLLING);
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = imagePlayerObject.movements.Rolling.frameY;
    this.player.maxFrame = imagePlayerObject.movements.Rolling.maxFrame;
  }
  handleInput(inputKeys) {
    if (!inputKeys.includes(EInputKeys.ENTER) && this.player.onGround()) {
      this.player.setState(EStates.RUNNING, 1);
    } else if (!inputKeys.includes(EInputKeys.ENTER) && !this.player.onGround()) {
      this.player.setState(EStates.FALLING, 1);
    } else if (
      inputKeys.includes(EInputKeys.ENTER) &&
      inputKeys.includes(EInputKeys.ARROW_UP) &&
      this.player.onGround()
    ) {
      this.player.vy -= this.player.maxJumpHeight;
    }
  }
}
