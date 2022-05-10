'use strict';

const EventEmitter = require('events');
const EventBus = require('../domain/event-bus');

/**
 * I am creating a basic event bus using Node.js EventEmitter
 * Other solution I implemented in the past was with https://www.npmjs.com/package/hertzy but
 * it's an overhead for this code challenge
 */

class EventBusInMemory extends EventBus {
  /**
   * @property {Logger}
   */
  #logger = null;

  /**
   * @property {EventEmitter} 
   */
  #emitter = null;

  constructor(logger) {
    super();
    this.#logger = logger;
    this.#emitter = new EventEmitter;
  }

  subscribeTo(eventName, handler) {
    this.#logger.info(`subscribed to ${eventName}`);
    this.#emitter.on(eventName, handler);
  }

  publish(events) {
    try {
      this.#logger.info(`Publishing events`);
      console.log(events);
      for (const event of events) {
        this.#emitter.emit(event.eventName(), event.getEvent());
      }
    } catch (e) {
      /**
       * In a production system, we should perform some: 
       *  retry / enqueue / dead letter logic
       */
      this.#logger.error('Error on publish');
      this.#logger.error(e);
    }
  }
}

module.exports = EventBusInMemory;
