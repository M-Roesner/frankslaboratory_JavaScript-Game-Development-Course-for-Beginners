/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// The width and height of the canvas are automatically obtained from the style.css properties.
const canvasStyle = window.getComputedStyle(canvas);
canvas.width = parseInt(canvasStyle.width);
canvas.height = parseInt(canvasStyle.height);
console.log(`Canvas width: ${canvas.height}, Canvas height: ${canvas.width}`);

window.addEventListener("load", () => {
  class Classname {
    constructor() {}
    update(deltaTime) {}
    draw() {}
  }

  let lastTime = 0;
  const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // code

    requestAnimationFrame(animate);
  };
  animate(0);
});
