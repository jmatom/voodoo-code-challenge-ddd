'use strict';

const { v4: uuidV4 } = require('uuid');
const { validate: isValidUuid } = require('uuid');

class Uuid {
  /**
   * @property {String}
   */
  #uuid = null;

  /**
   * @param {String} uuid 
   */
  constructor(uuid) {
    this._ensureIsValidUuid(uuid);

    this.#uuid = uuid;
  }

  _ensureIsValidUuid(value) {
    /**
     * We should create a custom exception to track better the error but for this test I prefer
     * to simplify the code because new error will not be used
     */
    if (!isValidUuid(value)) {
      throw new TypeError(`uuid is not valid, received: ${value}`);
    }
  }

  /**
   * @returns {Uuid} uuid
   */
  static random() {
    const uuid = new Uuid(uuidV4());

    return uuid;
  }

  value() {
    return this.#uuid;
  }
}

module.exports = Uuid;
