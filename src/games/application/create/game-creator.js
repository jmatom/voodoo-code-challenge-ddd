'use strict';

const Game = require('../../domain/game');
const GameName = require('../../domain/game-name');
const Platform = require('../../domain/platform');
const ApplicationService = require('../../../shared/domain/application-service');
const GameId = require('../../domain/game-id');
const Uuid = require('../../../shared/domain/uuid');

class GameCreator extends ApplicationService {
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
   * Create a game
   *
   * @param {String} gameNameRaw
   * @param {String} platformRaw
   * @throws <GameNameInvalidValue, PlatformInvalidValue>
   */
  async execute(gameNameRaw, platformRaw) {
    const id = Uuid.random();
    const name = new GameName(gameNameRaw);
    const platform = new Platform(platformRaw);

    const game = Game.create(id, name, platform);
    await this.#gameRepository.save(game);

    // const gameCreatedEvent = new CreatedGameDomainEvent(idRaw, name, platform);

    this.#bus.publish(game.pullDomainEvents());

    return game;
  }
}

module.exports = GameCreator;
