export const ELastKeys = {
  PRESS_LEFT: "PRESS left",
  RELEAS_LEFT: "RELEAS left",
  PRESS_RIGHT: "PRESS right",
  RELEAS_RIGHT: "RELEAS right",
};

export default class InputHander {
  constructor() {
    this.lastKey = "";
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  }
  handleKeyDown(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.lastKey = ELastKeys.PRESS_LEFT;
        break;
      case "ArrowRight":
        this.lastKey = ELastKeys.PRESS_RIGHT;
        break;
    }
  }
  handleKeyUp(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.lastKey = ELastKeys.RELEAS_LEFT;
        break;
      case "ArrowRight":
        this.lastKey = ELastKeys.RELEAS_RIGHT;
        break;
    }
  }
}
