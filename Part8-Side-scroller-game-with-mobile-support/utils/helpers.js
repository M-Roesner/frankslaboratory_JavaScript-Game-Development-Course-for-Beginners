export const displayStatusText = (ctx, canvas, score, gameOver) => {
  // There is a shadow function, but the performance will be bad,
  // so it is drawn in a different way.
  ctx.textAlign = "left";
  ctx.font = "40px Helvetica";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 20, 50);
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 22, 52);

  if (gameOver) {
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Game Over, press Enter or swipe down to reset!", canvas.width / 2, 200);
    ctx.fillStyle = "white";
    ctx.fillText("Game Over, press Enter or swipe down to reset!", canvas.width / 2 + 2, 202);
  }
};

/**
 * description:
 * If you try to use "document.fullscreenElement" directly, you will get an error...
 * "Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture."
 * You can only handle it with a click event or something else.
 */
export const toggleFullScreen = (canvas) => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().catch((err) => {
      alert(` Error, can't enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
};
