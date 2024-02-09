export const drawStatusText = (ctx, input, player) => {
  ctx.font = "30px Helvetica";
  ctx.fillText(`Last input: ${input.lastKey}`, 20, 40);
  ctx.fillText(`Active state: ${player.currentState.state}`, 20, 80);
};
