export const EInputKeys = {
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  ENTER: "Enter",
  DEBUG_D: "d",
};

export class InputHander {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  }
  handleKeyDown(e) {
    if (
      (e.key === EInputKeys.ARROW_DOWN ||
        e.key === EInputKeys.ARROW_UP ||
        e.key === EInputKeys.ARROW_LEFT ||
        e.key === EInputKeys.ARROW_RIGHT ||
        e.key === EInputKeys.ENTER) &&
      this.keys.indexOf(e.key) === -1
    ) {
      this.keys.push(e.key);
    }
    this.handleDebug(e);
    console.log(e.key, this.keys);
  }
  handleKeyUp(e) {
    if (
      e.key === EInputKeys.ARROW_DOWN ||
      e.key === EInputKeys.ARROW_UP ||
      e.key === EInputKeys.ARROW_LEFT ||
      e.key === EInputKeys.ARROW_RIGHT ||
      e.key === EInputKeys.ENTER
    ) {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    }
    console.log(e.key, this.keys);
  }
  handleDebug(e) {
    if (e.key === EInputKeys.DEBUG_D)
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
      else this.keys.splice(this.keys.indexOf(e.key), 1);
  }
}
