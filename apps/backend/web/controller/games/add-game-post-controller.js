'use strict';

const ApplicationService = require('../../../../../src/shared/domain/application-service');

const HTTP_CODE_GAME_CREATED = 201;
const HTTP_CODE_BAD_REQUEST = 400;

class AddGamePostController {
  /**
   * @property {ApplicationService}
   */
  #gameCreator = null;

  /**
   * @property {Logger}
   */
  #logger = null;

  /**
   * @param {ApplicationService} gameCreator
   */
  constructor(gameCreator, logger) {
    this.#gameCreator = gameCreator;
    this.#logger = logger;

    this.invoke = this.invoke.bind(this);
  }

  async invoke(request, reply) {
    try {
      const {
        name,
        platform,
      } = request.body;
      await this.#gameCreator.execute(name, platform);

      reply.code(HTTP_CODE_GAME_CREATED).send();
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

module.exports = AddGamePostController;
