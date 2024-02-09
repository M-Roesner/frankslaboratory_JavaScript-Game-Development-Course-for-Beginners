/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const canvasStyle = window.getComputedStyle(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(`Canvas width: ${canvas.height}, Canvas height: ${canvas.width}`);

window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  loading.style.display = "none";

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
