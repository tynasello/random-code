import { Vec } from "./utilities.js";
import { State } from "./main.js";

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

const wobbleSpeed = 8;
const wobbleDist = 0.07;

const arrowKeys = manageKeyAction(["ArrowLeft", "ArrowRight", "ArrowUp"]);

class Player {
  constructor(position, speed) {
    this.position = position;
    this.speed = speed;
  }
  getType() {
    return "player";
  }
  // removed static
  static create(position) {
    let newPlayer = new Player(position.plus(new Vec(0, -0.5)), new Vec(0, 0));
    return newPlayer;
  }
}

class Lava {
  constructor(position, speed, reset) {
    this.position = position;
    this.speed = speed;
    this.reset = reset;
  }
  getType() {
    return "lava";
  }

  static create(position, character) {
    let newLava = null;
    if (character == "=") {
      newLava = new Lava(position, new Vec(2, 0), null);
    } else if (character == "|") {
      newLava = new Lava(position, new Vec(0, 2), null);
    } else if (character == "v") {
      newLava = new Lava(position, new Vec(0, 3), position);
    }
    return newLava;
  }
}
class Coin {
  constructor(position, basePosition, wobble) {
    this.position = position;
    this.basePosition = basePosition;
    this.wobble = wobble;
  }
  getType() {
    return "coin";
  }
  static create(position) {
    let basePosition = position.plus(new Vec(0.2, 0.1));
    let newCoin = new Coin(
      basePosition,
      basePosition,
      Math.random() * Math.PI * 2
    );
    return newCoin;
  }
}

Player.prototype.size = new Vec(0.8, 1.5);
Lava.prototype.size = new Vec(1, 1);
Coin.prototype.size = new Vec(0.6, 0.6);

Lava.prototype.collide = function (state) {
  let newState = new State(state.level, state.currentEntities, "end");
  return newState;
};
Coin.prototype.collide = function (state) {
  let coinRemoved = [];
  state.currentEntities.forEach((entity) => {
    if (entity != this) {
      coinRemoved.push(entity);
    }
  });
  let status = state.gameStatus;
  if (!coinRemoved.some((entity) => entity.getType() == "coin")) status = "won";
  let newState = new State(state.level, coinRemoved, status);
  return newState;
};

Player.prototype.update = function (time, gameState, keysPressed) {
  let speedX = 0;
  if (keysPressed.ArrowLeft) speedX -= playerXSpeed;
  if (keysPressed.ArrowRight) speedX += playerXSpeed;
  let position = this.position;
  let moveX = position.plus(new Vec(speedX * time, 0));
  if (!gameState.level.touches(moveX, this.size, "wall")) position = moveX;

  let speedY = this.speed.y + time * gravity;
  let moveY = position.plus(new Vec(0, speedY * time));
  if (!gameState.level.touches(moveY, this.size, "wall")) position = moveY;
  else if (keysPressed.ArrowUp && speedY > 0) speedY = -jumpSpeed;
  else speedY = 0;

  let newSpeed = new Vec(speedX, speedY);
  return new Player(position, newSpeed);
};

Lava.prototype.update = function (time, state) {
  let newPosition = this.position.plus(this.speed.times(time));
  let newLava;
  if (!state.level.touches(newPosition, this.size, "wall")) {
    newLava = new Lava(newPosition, this.speed, this.reset);
  } else if (this.reset) {
    newLava = new Lava(this.reset, this.speed, this.reset);
  } else {
    newLava = new Lava(this.position, this.speed.times(-1));
  }
  return newLava;
};
Coin.prototype.update = function (time) {
  let wobble = this.wobble + time * wobbleSpeed;
  let wobblePosition = Math.sin(wobble) * wobbleDist;
  let newCoin = new Coin(
    this.basePosition.plus(new Vec(0, wobblePosition)),
    this.basePosition,
    wobble
  );
  return newCoin;
};

function manageKeyAction(keys) {
  let key = Object.create(null);
  function updateKeyObj(event) {
    if (keys.includes(event.key)) {
      key[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }

  window.addEventListener("keydown", updateKeyObj);
  window.addEventListener("keyup", updateKeyObj);
  return key;
}

const objectCharacters = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
};

export { objectCharacters, arrowKeys };
