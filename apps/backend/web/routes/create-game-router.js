'use strict';

function generateRoute(controller) {
  const router = {
    method: 'POST',
    url: '/api/games',
    handler: controller.invoke,
  };

  return router;
}

module.exports = generateRoute;
