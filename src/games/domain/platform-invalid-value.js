'use strict';

class PlatformInvalidValue extends Error {
  constructor(value) {
    super(`Platform must be a valid one. Received: ${value}`);

    this.name = 'PlatformInvalidValue';
  }
}

module.exports = PlatformInvalidValue;
