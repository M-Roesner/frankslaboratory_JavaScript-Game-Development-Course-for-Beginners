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
};

export const EAnimatioStates = {
  SITTING: "SITTING",
  RUNNING: "RUNNING",
  JUMPING: "JUMPING",
  FALLING: "FALLING",
  //   STANDING: "STANDING",
  // ATTACKING: "ATTACKING",
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
    this.player.frameY = imagePlayerObject.movements.Sitting.frameY;
    this.player.maxFrame = imagePlayerObject.movements.Sitting.maxFrame;
  }
  handleInput(inputKeys) {
    if (inputKeys.includes(EInputKeys.ARROW_LEFT) || inputKeys.includes(EInputKeys.ARROW_RIGHT)) {
      this.player.setState(EStates.RUNNING);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super(EAnimatioStates.RUNNING);
    this.player = player;
  }
  enter() {
    this.player.frameY = imagePlayerObject.movements.Running.frameY;
    this.player.maxFrame = imagePlayerObject.movements.Running.maxFrame;
  }
  handleInput(inputKeys) {
    if (inputKeys.includes(EInputKeys.ARROW_DOWN)) {
      this.player.setState(EStates.SITTING);
    } else if (inputKeys.includes(EInputKeys.ARROW_UP)) {
      this.player.setState(EStates.JUMPING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super(EAnimatioStates.JUMPING);
    this.player = player;
  }
  enter() {
    this.player.frameY = imagePlayerObject.movements.Jumping.frameY;
    this.player.maxFrame = imagePlayerObject.movements.Jumping.maxFrame;
    if (this.player.onGround()) this.player.vy -= this.player.maxJumpHeight;
  }
  handleInput(inputKeys) {
    if (this.player.isFalling()) {
      this.player.setState(EStates.FALLING);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super(EAnimatioStates.FALLING);
    this.player = player;
  }
  enter() {
    this.player.frameY = imagePlayerObject.movements.Falling.frameY;
    this.player.maxFrame = imagePlayerObject.movements.Falling.maxFrame;
  }
  handleInput(inputKeys) {
    if (this.player.onGround()) {
      this.player.setState(EStates.RUNNING);
    }
  }
}
