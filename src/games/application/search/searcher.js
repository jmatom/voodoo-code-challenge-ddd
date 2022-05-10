'use strict';

const Game = require('../../domain/game');
const GameNotFound = require('../../domain/game-not-found');
const GameName = require('../../domain/game-name');
const Platform = require('../../domain/platform');
const ApplicationService = require('../../../shared/domain/application-service');

class GameSearcher extends ApplicationService {
  /**
   * @property {GameRepository}
   */
  #gameRepository = null;

  /**
   * @property {EventBus} bus
   */
  #bus = null;

  /**
   * @property {Logger} logger
   */
  #logger = null;

  /**
   * @param {GameRepository} gameRepository
   * @param {EventBus} bus
   * @param {Logger} logger
   */
  constructor(gameRepository, bus, logger) {
    super();
    this.#gameRepository = gameRepository;
    this.#bus = bus;
    this.#logger = logger;
  }

  /**
   * Search a game by platform, name or both
   * 
   * @param {String} platformRaw
   * @param {String} gameNameRaw
   * @returns {Game} game
   * @throws <GameNameInvalidValue, PlatformInvalidValue>
   */
  async execute(platformRaw, gameNameRaw) {
    const platform = new Platform(platformRaw);
    const gameName = new GameName(gameNameRaw);

    const games = await this.#gameRepository.searchByPlatformOrName(platform, gameName);

    return games;
  }
}

module.exports = GameSearcher;
