'use strict';

class GetStatusController {
  #logger = null;

  constructor(logger) {
    console.log('constructor getstatuscontroller');
    this.#logger = logger;
  }

  async invoke(request, reply) {
    reply.send('Hello world');
  }
}

module.exports = GetStatusController;
