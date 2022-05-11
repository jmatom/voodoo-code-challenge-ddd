'use strict';

class GetStatusController {
  #logger = null;

  constructor(logger) {
    this.#logger = logger;
  }

  async invoke(request, reply) {
    reply.send('Hello world');
  }
}

module.exports = GetStatusController;
