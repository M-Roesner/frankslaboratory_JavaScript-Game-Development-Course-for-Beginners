export class InputHandler {
  constructor(debugmode) {
    this.keys = [];
    this.touchY = "";
    this.touchTreshold = 30;
    this.restartGame = false;
    this.gameOver = false;
    this.debugmode = debugmode;

    /**
     * description: this.keys.indexOf(e.key):
     * Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
     */

    // controle keys
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));

    // controle touch
    window.addEventListener("touchstart", (e) => (this.touchY = e.changedTouches[0].pageY));
    window.addEventListener("touchmove", (e) => this.handleTouchmove(e));
    window.addEventListener("touchend", () => this.handleTouchend());
  }

  handleKeyDown(e) {
    if (
      (e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight") &&
      this.keys.indexOf(e.key) === -1
    )
      this.keys.push(e.key);
    else if (e.key === "Enter" && this.gameOver) {
      this.restartGame = true;
      console.log("handler Enter restart", this.restartGame);
    } else if (e.key === "d") debugmode = !debugmode;
  }

  handleKeyUp(e) {
    // .splice() removes the value from the array.
    if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    )
      this.keys.splice(this.keys.indexOf(e.key), 1);
  }

  handleTouchmove(e) {
    const swipeDistance = e.changedTouches[0].pageY - this.touchY;
    if (swipeDistance < -this.touchTreshold && this.keys.indexOf("swipe up") === -1)
      this.keys.push("swipe up");
    else if (swipeDistance > this.touchTreshold && this.keys.indexOf("swipe down") === -1) {
      this.keys.push("swipe down");
      if (this.gameOver) {
        this.restartGame = true;
        console.log("handler touchTreshold restart", this.restartGame);
      }
    }
  }
  handleTouchend() {
    this.keys.splice(this.keys.indexOf("swipe up"), 1);
    this.keys.splice(this.keys.indexOf("swipe down"), 1);
  }

  restart(gameOver) {
    this.gameOver = gameOver;
    this.restartGame = false;
    console.log("handler restart", this.restartGame);
    return this.restartGame;
  }
}
