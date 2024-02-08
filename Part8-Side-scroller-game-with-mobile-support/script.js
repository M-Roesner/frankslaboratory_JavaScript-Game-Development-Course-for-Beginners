/** @type {HTMLCanvasElement} */

import { Background } from "./classes/Background.js";
import { Enemy } from "./classes/Enemy.js";
import { Player } from "./classes/Player.js";
import { displayStatusText, toggleFullScreen } from "./utils/helpers.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 720;

let enemies = [];
let enemyTimer = 0;
const enemyIntervall = 1000;

let score = 0;
let gameOver = false;
let lastTime = 0;
let debugmode = true;

const fullScreenButton = document.getElementById("fullScreenButton");
fullScreenButton.addEventListener("click", () => toggleFullScreen(canvas));

window.addEventListener("load", () => {
  class InputHandler {
    constructor() {
      this.keys = [];
      this.touchY = "";
      this.touchTreshold = 30;

      // controle keys
      window.addEventListener("keydown", (e) => this.handleKeyDown(e));
      window.addEventListener("keyup", (e) => this.handleKeyUp(e));

      // controle touch
      window.addEventListener("touchstart", (e) => (this.touchY = e.changedTouches[0].pageY));
      window.addEventListener("touchmove", (e) => this.handleTouchmove(e));
      window.addEventListener("touchend", () => this.handleTouchend());
    }
    /**
     * descriptions:
     * this.keys.indexOf(e.key):
     * Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
     *
     * splice():
     * Removes elements from an array and, if necessary,
     * inserts new elements in their place, returning the deleted elements.
     */
    handleKeyDown(e) {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight") &&
        this.keys.indexOf(e.key) === -1
      )
        this.keys.push(e.key);
      else if (e.key === "Enter" && gameOver) restartGame();
      else if (e.key === "d") debugmode = !debugmode;
    }
    handleKeyUp(e) {
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
        if (gameOver) restartGame();
      }
    }
    handleTouchend() {
      this.keys.splice(this.keys.indexOf("swipe up"), 1);
      this.keys.splice(this.keys.indexOf("swipe down"), 1);
    }
  }

  const handleEnemies = (deltaTime) => {
    const randomEnemyIntervall = Math.random() * 5000 + 500;
    // create a new enemy
    if (enemyTimer > enemyIntervall + randomEnemyIntervall) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      enemyTimer = 0;
    } else enemyTimer += deltaTime;

    // update and draw the enemies
    enemies.forEach((enemy) => {
      score = enemy.update(deltaTime, score);
      enemy.draw(ctx, debugmode);
    });

    // remove enemies
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
  };

  const restartGame = () => {
    player.restart();
    background.restart();
    enemies = [];
    score = 0;
    gameOver = false;
    animate(0);
  };

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    background.update();
    background.draw(ctx);
    gameOver = player.update(input, deltaTime, enemies, gameOver);
    player.draw(ctx, debugmode);

    handleEnemies(deltaTime);
    displayStatusText(ctx, canvas, score, gameOver);

    if (!gameOver) requestAnimationFrame(animate);
  };
  animate(0);
});
