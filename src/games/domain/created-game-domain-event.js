'use strict';

const DomainEvent = require('../../shared/domain/domain-event');

/**
 * 1. An use case / app service can trigger/emit events.
 * These events are domain events and can be extended from a base class DomainEvent to specify
 * some common behaviour
 * For the purpose of this code challenge, I will put all the necessary methods here
 * 
 * 2. A domain name, can follow some specs to create the names (in the same way there are
 * styles to create databases/tables/columns names). One the spec I know is:
 *  - https://github.com/fmvilas/topic-definition
 */
const FULL_QUALIFIED_EVENT_NAME = 'voodoo.game.1.event.game.created';

class CreatedGameDomainEvent extends DomainEvent {
  /**
   * @property {String}
   */
  #id = null;

  /**
   * @property {String}
   */
  #name = null;

  /**
   * @property {String}
   */
  #platform = null;

  /**
   * Constructor always expect a primitive data type
   * @param {String} name
   * @param {String} platform
   * @param {Timestmap?} ocurredOn
   */
  constructor(id, name, platform, ocurredOn = null) {
    super(id);
    this.#id = id;
    this.#name = name;
    this.#platform = platform;
    this.ocurredOn = ocurredOn;
  }

  static eventName() {
    return FULL_QUALIFIED_EVENT_NAME;
  }

  eventName() {
    return FULL_QUALIFIED_EVENT_NAME;
  }

  getEvent() {
    return {
      eventName: this.eventName(),
      data: this.toPrimitives(),
    };
  }

  toPrimitives() {
    return {
      name: this.#name,
      platform: this.#platform,
    };
  }
}

module.exports = CreatedGameDomainEvent;
