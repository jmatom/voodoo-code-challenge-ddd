'use strict';

const Uuid = require('../../shared/domain/uuid');
const Game = require('../domain/game');
const GameId = require('../domain/game-id');
const GameName = require('../domain/game-name');
const GameRepository = require('../domain/game-repository');
const Platform = require('../domain/platform');

class GameRepositorySqlite extends GameRepository {
  /**
   * @property {GameModel}
   */
  #GameModel = null;

  constructor(GameModel) {
    super();
    this.#GameModel = GameModel;
  }

  /**
   * Saves a game
   * @param {Game} game 
   */
  async save(game) {
    try {
      this.#GameModel.create({
        id: game.getId().value(),
        name: game.getName().value(),
        platform: game.getPlatform().value(),
      });
    } catch (e) {
      /**
       * Here we can return a domain error to indicate what happened and abstract
       * from the database
       */
      throw e;
    }
  }

  /**
   * @param {Platform} platform
   * @param {GameName} gameName
   * @returns {Array.Game}
   */
  async searchByPlatformOrName(platform = null, gameName = null) {
    /*
    const where = {
      ...(platform && { platform }),
      ...(name && { name: { [Sequelize.Op.like]: `%${name}%` }}),
    };

     return Game.findAll({ where });
     */
    const gamesModel = await this.#GameModel.findAll();

    const games = gamesModel.map((gameModel) => {
      const id = new GameId(gameModel.id);
      const name = new GameName(gameModel.name);
      const platform = new Platform(gameModel.platform);
      const game = new Game(id, name, platform);

      return game;
    });

    return games;
  }
}

module.exports = GameRepositorySqlite;
