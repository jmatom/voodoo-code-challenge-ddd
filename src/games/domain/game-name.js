'use strict';

class GameName {
  /**
   * @property {String}
   */
  #name = null;

  /**
   * 
   * @param {String} value
   */
  constructor(value) {
    this.#ensureIsValidName(value);

    this.#name = value.trim();
  }

  #ensureIsValidName(value) {
    if (value.trim().length === 0) {
      throw new GameNameInvalidValue(value);
    }
  }

  value() {
    return this.#name;
  }
}

module.exports = GameName;
