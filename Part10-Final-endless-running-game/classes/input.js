export class InputHander {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  }
  handleKeyDown(e) {
    if (
      (e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Enter") &&
      this.keys.indexOf(e.key) === -1
    ) {
      this.keys.push(e.key);
    }
    this.handleDebug(e);
    console.log(e.key, this.keys);
  }
  handleKeyUp(e) {
    if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Enter"
    ) {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    }
    console.log(e.key, this.keys);
  }
  handleDebug(e) {
    if (e.key === "d")
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
      else this.keys.splice(this.keys.indexOf(e.key), 1);
  }
}
