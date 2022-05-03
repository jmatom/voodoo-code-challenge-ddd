'use strict';

const { getStatus } = require('../controller/healthcheck');

const router = {
  method: 'GET',
  url: '/status',
  handler: getStatus,
};

module.exports = router;
