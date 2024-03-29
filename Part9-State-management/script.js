/** @type {HTMLCanvasElement} */

import InputHander from "./classes/input.js";
import Player from "./classes/player.js";
import { drawStatusText } from "./classes/utils.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(`Canvas width: ${canvas.height}, Canvas height: ${canvas.width}`);

const player = new Player(canvas.width, canvas.height);
const input = new InputHander();

window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  loading.style.display = "none";

  let lastTime = 0;
  const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    player.update(input);
    player.draw(ctx, deltaTime);

    drawStatusText(ctx, input, player);

    requestAnimationFrame(animate);
  };
  animate(0);
});
