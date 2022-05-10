'use strict';

function generateRoute(controller) {
  const router = {
    method: 'GET',
    url: '/status',
    handler: controller.invoke,
  };

  return router;
}

module.exports = generateRoute;
