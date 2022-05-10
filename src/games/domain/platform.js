'use strict';

const PlatformInvalidValue = require('./platform-invalid-value');

const validPlatforms = [
  'android',
  'ios',
];

class Platform {
  /**
   * @property {String}
   */
  #platform = null;

  /**
   * 
   * @param {String} value
   */
  constructor(value) {
    this.#ensureIsValidPlatform(value);

    this.#platform = value;
  }

  #ensureIsValidPlatform(value) {
    if (!validPlatforms.includes(value)) {
      throw new PlatformInvalidValue(value);
    }
  }

  value() {
    return this.#platform;
  }
}

module.exports = Platform;
