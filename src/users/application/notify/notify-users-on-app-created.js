'use strict';

const EventBus = require('../../../shared/domain/event-bus');
const DomainEvent = require('../../../shared/domain/domain-event');

/**
 * This is a domain event subscriber but is like an use case / app service,
 * the main difference is the invokation is done by a command handler
 */
class NotifyUsersOnAppCreated {
  /**
   * @property {EventBus}
   */
  #eventBus = null;

  /**
   * @property {Logger}
   */
  #logger = null;

  /**
   * @param {EventBus} eventBus
   * @param {Logger} logger
   */

  constructor(eventBus, logger) {
    this.#eventBus = eventBus;
    this.#logger = logger;

    this.execute = this.execute.bind(this);
  }

  /**
   * @param {DomainEvent} event
   */
  execute(event) {
    try {
      const { data: gameDto } = event;

      this.#logger.info(`Process event: ${JSON.stringify(gameDto)}`);
      this.#logger.info(`Notify ${gameDto.platform} users with interest in ${gameDto.name}`);
    } catch(e) {
      /**
       * If this fails, could be due to repository connection problems
       * we could enqueue the event to be reprocessed later
       */
      this.#logger.error(e);
    }
  }
}

module.exports = NotifyUsersOnAppCreated;
