'use strict';

const logger = require('pino')();
const webServer = require('./web');

/**
 * Create manually the dependency container
 * This can be done autmatically with a dependency injection package but for the purpose
 * of this code challenge it will be done manually to avoid magic
 */
const container = {
  'service.logger': logger,
};

async function start() {
  await webServer.start(container);
}

start();
