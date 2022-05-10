'use strict';

class GameNameInvalidValue extends Error {
  constructor(value) {
    super(`Name must be a valid one. Received: ${value}`);

    this.name = 'GameNameInvalidValue';
  }
}

module.exports = GameNameInvalidValue;
