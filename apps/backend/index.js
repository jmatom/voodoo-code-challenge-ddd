'use strict';

require('dotenv').config();
const logger = require('pino')();
const webServer = require('./web');

const controllers = require('./web/controller');

/**
 * Create manually the dependency inyection container
 * This can be done autmatically with a dependency injection package but for the purpose
 * of this code challenge it will be done manually to avoid magic
 * 
 * 
 * We have common components like logger or event bus but also
 * we need to create each controller and we know, following hexagonal architecture,
 * this is the basic dependency flow:
 *  - 1 controller invokes 1 use case
 *  - 1 use case will use repositories
 */
async function createDIC() {
  /**
   * Common components
   */
  const EventBus = require('../../src/shared/infrastructure/event-bus-in-memory');

  /**
   * Import all database models to have an initialized database connection
   */
  const { Sequelize } = require('sequelize');
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
  });

  /**
   * Create searcher app service with it's dependencies
   */
  const eventBus = new EventBus(logger);
  const GameModel = await require('../../src/games/infrastructure/models/game')(sequelize);
  const GameRepositorySqlite = require('../../src/games/infrastructure/game-repository-sqlite');
  const GameSearcherAppService = require('../../src/games/application/search/searcher');
  const gameRepository = new GameRepositorySqlite(GameModel);
  const gameSearcher = new GameSearcherAppService(gameRepository, eventBus, logger);

  /**
   * Create game creator app service and it's dependencies
   */
  const GameCreatorAppService = require('../../src/games/application/create/game-creator');
  const gameCreator = new GameCreatorAppService(gameRepository, eventBus, logger);

  /**
   * Create worker notify users on app created
   */
  const NotifyUsersOnAppCreated = require('../../src/users/application/notify/notify-users-on-app-created');
  const UsersNotificationOnAppCreated = require('./subscribers/users-notification-on-app-created');
  const notifyUsersOnAppCreated = new NotifyUsersOnAppCreated(eventBus, logger);
  new UsersNotificationOnAppCreated(notifyUsersOnAppCreated, eventBus, logger);

  const container = {
    'service.logger': logger,
    'service.bus': eventBus,
    'app.backend.controllers': {
      healthcheck: {
        getStatus: new controllers.healthcheck.GetStatusController(logger),
      },
      games: {
        searchGamesGetController: new controllers.games.SearchGamesGetController(gameSearcher, logger),
        addGamePostController: new controllers.games.AddGamePostController(gameCreator, logger),
      },
    },
  };

  return container;
}

async function start() {
  const container = await createDIC();
  await webServer.start(container);
}

start();
