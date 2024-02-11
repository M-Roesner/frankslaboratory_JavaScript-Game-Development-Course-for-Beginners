export const imageEnemiesObject = {
  flyingEnemy: {
    imgTagId: "enemy_fly",
    fileName: "enemy_fly.png",
    maxFrame: 5,
    spriteWidth: 60,
    spriteHeight: 44,
  },
  groundEnemy: {
    imgTagId: "enemy_plant",
    fileName: "enemy_plant.png",
    maxFrame: 1,
    spriteWidth: 60,
    spriteHeight: 87,
  },
  climbingEnemy: {
    imgTagId: "enemy_spider_big",
    fileName: "enemy_spider_big.png",
    maxFrame: 5,
    spriteWidth: 120,
    spriteHeight: 144,
  },
};
export const EEnemyTypes = {
  FLYING_ENEMY: "flyingEnemy",
  GROUND_ENEMY: "groundEnemy",
  CLIMBING_ENEMY: "climbingEnemy",
};

class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;

    this.markedForDeletion = false;

    // initial values
    this.maxFrame = 0;
    this.speedX = 0;
    this.speedY = 0;
  }
  update(deltaTime) {
    // movement
    this.x -= this.speedX + this.game.gameSpeed;
    this.y += this.speedY;

    // animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else this.frameTimer += deltaTime;

    // Checks is an enemy outside the screen.
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.enemyType = EEnemyTypes.FLYING_ENEMY;
    this.width = imageEnemiesObject[this.enemyType].spriteWidth;
    this.height = imageEnemiesObject[this.enemyType].spriteHeight;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;

    this.image = document.getElementById(imageEnemiesObject[this.enemyType].imgTagId);
    this.maxFrame = imageEnemiesObject[this.enemyType].maxFrame;

    this.speedX = Math.random() + 1;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1; // va = velocity of angle
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.enemyType = EEnemyTypes.GROUND_ENEMY;
    this.width = imageEnemiesObject[this.enemyType].spriteWidth;
    this.height = imageEnemiesObject[this.enemyType].spriteHeight;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;

    this.image = document.getElementById(imageEnemiesObject[this.enemyType].imgTagId);
    this.maxFrame = imageEnemiesObject[this.enemyType].maxFrame;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor() {}
  update() {}
  draw() {}
}
