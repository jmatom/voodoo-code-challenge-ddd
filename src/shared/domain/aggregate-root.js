'use strict';

const DomainEvent = require('./domain-event');

/**
 * This class is abstract but JS has not a reserved word to denote it
 */
const domainEvents = [];

class AggregateRoot {
  #domainEvents = [];

  /**
   * @param {DomainEvent} event
   */
  registerEvent(event) {
    this.#domainEvents.push(event);
  }

  /**
   * returns {Array.<DomainEvent>} events
   */
  pullDomainEvents() {
    const events = [...this.#domainEvents];
    domainEvents.length = 0;

    return events;
  }

  /**
   * This method converts the given primitives data into a Value Object
   */
  static fromPrimitives() {
    throw new Error('you need to overwrite an implement this method');
  }
}

module.exports = AggregateRoot;
