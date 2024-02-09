export const ELastKeys = {
  PRESS_LEFT: "PRESS left",
  RELEAS_LEFT: "RELEAS left",
  PRESS_RIGHT: "PRESS right",
  RELEAS_RIGHT: "RELEAS right",
  PRESS_DOWN: "PRESS down",
  RELEAS_DOWN: "RELEAS down",
  PRESS_UP: "PRESS up",
  RELEAS_UP: "RELEAS up",
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
      case "ArrowDown":
        this.lastKey = ELastKeys.PRESS_DOWN;
        break;
      case "ArrowUp":
        this.lastKey = ELastKeys.PRESS_UP;
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
      case "ArrowDown":
        this.lastKey = ELastKeys.RELEAS_DOWN;
        break;
      case "ArrowUp":
        this.lastKey = ELastKeys.RELEAS_UP;
        break;
    }
  }
}
