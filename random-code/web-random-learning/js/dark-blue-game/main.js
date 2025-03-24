// Entities
import { objectCharacters, arrowKeys } from "./entities.js";

// Utilities
import { Vec, overlap } from "./utilities.js";

// Display
import { Display } from "./display.js";

// Levels
import { GAME_LEVELS } from "./levels.js";

/*----

----*/

class Level {
  //changed plan to lvlNum
  constructor(lvlString) {
    let rows = lvlString
      .trim()
      .split("\n")
      .map((r) => [...r]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.entities = [];

    this.rows = rows.map((row, y) => {
      return row.map((el, x) => {
        let elType = objectCharacters[el];
        if (typeof elType == "string") {
          return elType;
        }
        let newEntity = elType.create(new Vec(x, y), el);
        this.entities.push(newEntity);
        return "empty";
      });
    });
  }
}
Level.prototype.touches = function (position, size, isTouchingType) {
  let startX = Math.floor(position.x);
  let endX = Math.ceil(position.x + size.x);
  let startY = Math.floor(position.y);
  let endY = Math.ceil(position.y + size.y);

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      let touching;
      if (y < 0 || x < 0 || x >= this.width || y >= this.height) {
        touching = "wall";
      } else {
        touching = this.rows[y][x];
      }
      if (touching == isTouchingType) {
        return true;
      }
    }
  }
  return false;
};

class State {
  constructor(level, currentEntities, gameStatus) {
    this.level = level;
    this.currentEntities = currentEntities;
    this.gameStatus = gameStatus;
  }
  static startGame(level) {
    let newState = new State(level, level.entities, "playing");
    return newState;
  }
  getPlayer() {
    let player = this.currentEntities.find(
      (entity) => entity.getType() == "player"
    );
    return player;
  }
}

State.prototype.update = function (time, keysBeingPressed) {
  let entities = [];
  this.currentEntities.forEach((entity) => {
    entities.push(entity.update(time, this, keysBeingPressed));
  });
  // ////////////
  let newState = new State(this.level, entities, this.gameStatus);
  if (newState.gameStatus != "playing") return newState;

  let player = newState.getPlayer();
  if (this.level.touches(player.position, player.size, "lava")) {
    newState = new State(this.level, entities, "end");
    return newState;
  }
  entities.forEach((entity) => {
    if (entity != player && overlap(player, entity)) {
      newState = entity.collide(newState);
    }
  });
  return newState;
};

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level) {
  let display = new Display(document.body, level);
  let state = State.startGame(level);
  let ending = 0.3;
  return new Promise((resolve) => {
    runAnimation((time) => {
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.gameStatus == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clearDisplay();
        resolve(state.gameStatus);
        return false;
      }
    });
  });
}

async function runGame(plans) {
  let lives = 3;
  for (let level = 0; level < plans.length && lives >= 0; ) {
    console.log(`Level ${level + 1}, ${lives} lives left`);
    let status = await runLevel(new Level(plans[level]));
    if (status == "won") level++;
    else if (status == "end") {
      lives -= 1;
    }
  }
  if (lives > 0) {
    window.alert("You've won!");
  } else {
    window.alert("Game Over!");
  }
}

runGame(GAME_LEVELS);

export { State };
