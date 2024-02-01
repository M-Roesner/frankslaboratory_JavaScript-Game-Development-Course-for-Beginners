/** @type {HTMLCanvasElement} */

const dropdown = document.getElementById("animations");
let dropdownOptions = "";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// width and height comes from the style.css properties
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "./img/shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
let playerState = "idle";
document.addEventListener("change", (e) => (playerState = e.target.value));

let gameFrame = 0;
const staggerFrame = 5;

const spriteAnimations = [];
const animationStates = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "fall", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "ko", frames: 12 },
  { name: "getHit", frames: 4 },
];

animationStates.forEach((state, index) => {
  let frames = { loc: [] };
  for (let j = 0; j < state.frames; j++) {
    const positionX = j * spriteWidth;
    const positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });

    // fills the options the the select box inside of the html element
    if (j == 0)
      dropdownOptions += `<option value="${state.name}">${
        state.name.charAt(0).toUpperCase() + state.name.slice(1)
      }</option>`;
  }
  spriteAnimations[state.name] = frames;
});
dropdown.innerHTML = dropdownOptions;

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGT);

  let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  // not advanced technique the get the frame position
  //   if (gameFrame % staggerFrame == 0) {
  //     if (frameX < 7) frameX++;
  //     else frameX = 0;
  //   }

  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

  gameFrame++;
  requestAnimationFrame(animate);
};
animate();
