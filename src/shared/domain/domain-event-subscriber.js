'use strict';

const DomainEvent = require('./domain-event');

/**
 * Abstract class, use interface if you are using TS
 */
class DomainEventSubscriber {
  /**
   * Consume a message
   * @param {DomainEvent} event 
   */
  consume(event) {
    throw new Error('You need to implement consume method into your domain event subscriber');
  }

  /**
   * @returns [Array.String] Array of event names
   */
  subscribedTo() {
    throw new Error('You need to implement subscribedTo method into your domain event subscriber');
  }
}

module.exports = DomainEventSubscriber;
