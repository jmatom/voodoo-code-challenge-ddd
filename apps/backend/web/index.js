'use strict';

const fastify = require('fastify')();
const routes = require('./routes');

const port = process.env.PORT || 8000;

async function start(container) {
  const logger = container['service.logger'];

  return new Promise((resolve) => {
    // fastify.route(routes.healthcheck.getStatus);
    fastify.route(routes.createHealthCheckRouter(container['app.backend.controllers'].healthcheck.getStatus));
    fastify.route(routes.createSearchGamesRouter(container['app.backend.controllers'].games.searchGamesGetController));
    fastify.route(routes.createAddGameRouter(container['app.backend.controllers'].games.addGamePostController));

    fastify.listen(port, '0.0.0.0', (err) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
  
      logger.info(`Server up and running at port ${port}`);

      return resolve();
    });
  });
}

async function stop(container) {
  const logger = container['service.logger'];

  try {
    await fastify.close();
    logger.info('Graceful shutdown done');
  } catch (e) {
    logger.error(`Graceful shutdown failed. Forcing exit`, e);
    process.exit(1);
  }
}

module.exports = {
  start,
  stop,
};
