'use strict';

const Uuid = require('./uuid');

class DomainEvent {
  #aggregateId = null;
  #eventId = null;
  #occurredOn = null;

  /**
   * @param {String} name
   * @param {Uuid} eventId
   * @param {String} data Optional data associated to the event
   */
  constructor(aggregateId, eventId = null, occurredOn = null) {
    this.#aggregateId = aggregateId;
    this.#eventId = eventId?? Uuid.random().value();

    // We can create a new Date Wrapper to simplify date operations and have a proper data into our DDD
    this.#occurredOn = occurredOn?? new Date().toISOString();
  }

  /**
   * There is no abstract methods in javascript so we indicate it needs to be implemented
   */
  static fromPrimitives() {
    throw new Error('You need to implement fromPrimitives method into your domain event');
  }

  static toPrimitives() {
    throw new Error('You need to implement toPrimitives method into your domain event');
  }

  aggregateId() {
    return this.#aggregateId;
  }

  eventId() {
    return this.#eventId;
  }

  occurredOn() {
    return this.#occurredOn;
  }
}

module.exports = DomainEvent;
