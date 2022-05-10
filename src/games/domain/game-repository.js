'use strict';

const GameName = require('./game-name');
const Platform = require('./platform');

/**
 * This is an abstract class to denote what methods will implement a GameRepository
 * If you are using TS, create an interface :)
 */
class GameRepository {
  /**
   * Saves a game
   * @param {Game} game 
   */
  async save(game) {
    throw new Error('Implement your concreate method save for your concrete GameRepository');
  }

  /**
   * Search a game by platform and/or by name
   * @param {Platform} platform 
   * @param {GameName} gameName
   * @returns [Game]
   */
  async searchByPlatformOrName(platform, gameName) {
    throw new Error('Implement your concreate method searchByPlatformOrName for your concrete GameRepository');
  }
}

module.exports = GameRepository;
