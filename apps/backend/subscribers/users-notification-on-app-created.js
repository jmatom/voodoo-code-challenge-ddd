'use strict';

const DomainEvent = require('../../../src/shared/domain/domain-event');
const DomainEventSubscriber = require('../../../src/shared/domain/domain-event-subscriber');
const CreatedGameDomainEvent = require('../../../src/games/domain/created-game-domain-event');

class UsersNotificationOnAppCreated extends DomainEventSubscriber {
  /**
   * @property {Logger}
   */
  #logger = null;

  /**
   * @property {ApplicationService} 
   */
  #usersOnAppCreatedNotificator = null;

  /**
   * @param {AppService} usersOnAppCreatedNotificator
   * @param {EventBus} eventBus
   * @param {Logger} logger
   */
  constructor(usersOnAppCreatedNotificator, eventBus, logger) {
    super();

    this.#usersOnAppCreatedNotificator = usersOnAppCreatedNotificator;
    this.#logger = logger;
    this.consume = this.consume.bind(this);

    /**
     * In a future let's automate this thanks to the dependency container
     */
    this.#subscribedTo().forEach(eventName => eventBus.subscribeTo(eventName, this.consume));

    this.#logger.info('worker initialized!');
  }

  /**
   * Consume an event
   * @param {DomainEvent } event
   */
  async consume(event) {
    this.#logger.info('consuming event');
    this.#usersOnAppCreatedNotificator.execute(event);
  }

  #subscribedTo() {
    return [
      CreatedGameDomainEvent.eventName(),
    ];
  }
}

module.exports = UsersNotificationOnAppCreated;
