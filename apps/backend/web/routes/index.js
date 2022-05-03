'use strict';

const getStatus = require('./health-check');

module.exports = {
  healthcheck: {
    getStatus,
  },
};
