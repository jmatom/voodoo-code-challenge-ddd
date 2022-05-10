'use strict';

function generateRoute(gameSearchController, gameCreatorController) {
  const router = {
    method: 'GET',
    url: '/api/games/search',
    handler: gameSearchController.invoke,
  };

  return router;
}

module.exports = generateRoute;
