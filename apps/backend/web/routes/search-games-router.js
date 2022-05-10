'use strict';

function generateRoute(controller) {
  const router = {
    method: 'GET',
    url: '/api/games/search',
    handler: controller.invoke,
  };

  return router;
}

module.exports = generateRoute;
