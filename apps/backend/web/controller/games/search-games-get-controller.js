'use strict';

const ApplicationService = require('../../../../../src/shared/domain/application-service');

const HTTP_CODE_GAME_FOUND = 200;
const HTTP_CODE_BAD_REQUEST = 400;

class SearchGameGetController {
  #searcher = null;
  #logger = null;

  /**
   * @param {ApplicationService} gameSearcher
   */
  constructor(searcher, logger) {
    this.#searcher = searcher;
    this.#logger = logger;

    this.invoke = this.invoke.bind(this);
  }

  async invoke(request, reply) {
    try {
      const { 
        platform,
        name,
      } = request.query;
      const games = await this.#searcher.execute(platform, name);

      /**
       * Here we could create a mapper to transform our AggregateRoot into
       * the data we want to send
       */
      const gamesMapped = games.map((game) => game.getDto());

      reply.code(HTTP_CODE_GAME_FOUND).send(gamesMapped);
    } catch (e) {
      if (e.name === 'PlatformInvalidValue') {
        return reply.code(HTTP_CODE_BAD_REQUEST).send({
          error: 'Bad Request',
          message: e.message,
        });
      }

      if (e.name === 'GameNameInvalidValue') {
        return reply.code(HTTP_CODE_BAD_REQUEST).send({
          error: 'Bad Request',
          message: e.message,
        });
      }

      this.#logger.error(e);
      reply.code(500).send({
        error: 'Internal Server Error',
        message: e.message
      });
    }
  }
}

module.exports = SearchGameGetController;
