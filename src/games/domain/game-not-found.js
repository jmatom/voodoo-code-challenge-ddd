'use strict';

class GameNotFound extends Error {
  constructor() {
    super(`Game not found`);

    this.name = 'GameNotFound';
  }
}

module.exports = GameNotFound;
