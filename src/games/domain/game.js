'use strict';

const AggregateRoot = require('../../shared/domain/aggregate-root');
const CreatedGameDomainEvent = require('./created-game-domain-event');
const GameId = require('./game-id');
const GameName = require('./game-name');
const Platform = require('./platform');

class Game extends AggregateRoot {
  #id = null;
  #name = null;
  #platform = null;

  /**
   * @param {GameId} id 
   * @param {GameName} name 
   * @param {Platform} platform 
   */
  constructor(id, name, platform) {
    super();
    this.#id = id;
    this.#name = name;
    this.#platform = platform;
  }

  /**
   * @returns {GameId}
   */
  getId() {
    return this.#id;
  }

  /**
   * @returns {GameName}
   */
  getName() {
    return this.#name;
  }

  /**
   * @returns {Platform}
   */
  getPlatform() {
    return this.#platform;
  }

  /**
   * Factory method to create a game instance
   * The difference with the constructor is to create the domain event here
   * @param {Uuid} id 
   * @param {GameName} name 
   * @param {Platform} platform 
   * @returns 
   */
  static create(id, name, platform) {
    const game = new Game(id, name, platform);
    const gameCreatedEvent = new CreatedGameDomainEvent(
      id.value(),
      name.value(),
      platform.value()
    );
    game.registerEvent(gameCreatedEvent);

    return game;
  }

  getDto() {
    return {
      id: this.getId().value(),
      name: this.getName().value(),
      platform: this.getPlatform().value(),
    };
  }
}

module.exports = Game;
