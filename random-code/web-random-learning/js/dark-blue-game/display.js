import { createElement } from "./utilities.js";

const blockScale = 20;

function drawGrid(level) {
  let grid = createElement(
    "table",
    {
      class: "background",
      style: `width: ${level.width * blockScale}px`,
    },
    ...level.rows.map((row) =>
      createElement(
        "tr",
        { style: `height: ${blockScale}px` },
        ...row.map((type) => createElement("td", { class: type }))
      )
    )
  );
  return grid;
}

function displayEntities(entities) {
  let entityElements = [];

  entities.forEach((entity) => {
    let rectangle = createElement("div", {
      class: `entity ${entity.getType()}`,
    });
    rectangle.style.width = `${entity.size.x * blockScale}px`;
    rectangle.style.height = `${entity.size.y * blockScale}px`;
    rectangle.style.top = `${entity.position.y * blockScale}px`;
    rectangle.style.left = `${entity.position.x * blockScale}px`;
    entityElements.push(rectangle);
  });
  let DOMEntities = createElement("div", {}, ...entityElements);
  return DOMEntities;
}

// Display of game the appears in DOM
class Display {
  constructor(parent, currLevel) {
    this.display = createElement("div", { class: "game" }, drawGrid(currLevel));
    // Everytime display is updated, entitiesShowing is cleared, and entities are redrawn
    this.entitiesShowing = null;
    parent.appendChild(this.display);
  }
  clearDisplay() {
    this.display.remove();
  }
}
Display.prototype.scrollPlayerIntoView = function (state) {
  let width = this.display.clientWidth;
  let height = this.display.clientHeight;
  let margin = width / 3;

  let left = this.display.scrollLeft,
    right = left + width;
  let top = this.display.scrollTop,
    bottom = top + height;

  let player = state.getPlayer();
  let center = player.position.plus(player.size.times(0.5)).times(blockScale);

  if (center.x < left + margin) {
    this.display.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.display.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    this.display.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.display.scrollTop = center.y + margin - height;
  }
};

Display.prototype.syncState = function (state) {
  // "this" is the display object created
  if (this.entitiesShowing) {
    this.entitiesShowing.remove();
  }
  this.entitiesShowing = displayEntities(state.currentEntities);
  this.display.appendChild(this.entitiesShowing);
  this.display.className = `game ${state.gameStatus}`;
  this.scrollPlayerIntoView(state);
};



export { Display };
