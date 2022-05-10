'use strict';

const EventEmitter = require('events');

class EventBus {
  /**
   * Subscribe a handler with a given eventName
   * @param {String} eventName
   * @param {Function} handler
   */
  subscribeTo(eventName, handler) {
    throw new Error('Implement your method subscribeTo for your concreate version of EventBus');
  }

  /**
   * For each event, notify the associated handler
   * @param {Array.Event} events 
   */
  publish(events) {
    throw new Error('Implement your method publish for your concreate version of EventBus');
  }
}

module.exports = EventBus;
