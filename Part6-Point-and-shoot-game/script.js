/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// The width and height of the canvas are automatically obtained from the style.css properties.
const canvasStyle = window.getComputedStyle(canvas);
const CANVAS_WIDTH = (canvas.width = parseInt(canvasStyle.width));
const CANVAS_HEIGT = (canvas.height = parseInt(canvasStyle.height));
console.log(`Canvas width: ${CANVAS_WIDTH}, Canvas height: ${CANVAS_HEIGT}`);

window.addEventListener("load", () => {
  const animate = () => {
    requestAnimationFrame(animate);
  };
  animate();
});
