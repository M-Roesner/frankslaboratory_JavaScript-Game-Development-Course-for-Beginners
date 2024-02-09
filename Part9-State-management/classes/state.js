import { ELastKeys } from "./input.js";

export const EAnimationStates = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
};

export const EStates = {
  STANDING_LEFT: "STANDING LEFT",
  STANDING_RIGHT: "STANDING RIGHT",
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class StandingLeft extends State {
  constructor(player) {
    super(EStates.STANDING_LEFT);
    this.player = player;
  }
  enter() {
    this.player.frameY = 1;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_RIGHT)
      this.player.setState(EAnimationStates.STANDING_RIGHT); // Set state to StandingRight.
  }
}
export class StandingRight extends State {
  constructor(player) {
    super(EStates.STANDING_RIGHT);
    this.player = player;
  }
  enter() {
    this.player.frameY = 0;
  }
  handleInput(input) {
    if (input.lastKey === ELastKeys.PRESS_LEFT)
      this.player.setState(EAnimationStates.STANDING_LEFT); // Set state to StandingLeft.
  }
}
