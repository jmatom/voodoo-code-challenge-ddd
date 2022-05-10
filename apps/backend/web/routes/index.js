'use strict';

const createAddGameRouter = require('./create-game-router');
const createSearchGamesRouter = require('./search-games-router');
const createHealthCheckRouter = require('./health-check');

module.exports = {
  createHealthCheckRouter,
  createAddGameRouter,
  createSearchGamesRouter,
};
