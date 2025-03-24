class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

function createElement(name, attributes, ...children) {
  let el = document.createElement(name);
  Object.keys(attributes).forEach((attrKey) => {
    el.setAttribute(attrKey, attributes[attrKey]);
  });
  children.forEach((child) => {
    el.appendChild(child);
  });
  return el;
}

function overlap(entity1, entity2) {
  return (
    entity1.position.x + entity1.size.x > entity2.position.x &&
    entity2.position.x + entity2.size.x > entity1.position.x &&
    entity1.position.y + entity1.size.y > entity2.position.y &&
    entity2.position.y + entity2.size.y > entity1.position.y
  );
}
export { Vec, createElement, overlap };
