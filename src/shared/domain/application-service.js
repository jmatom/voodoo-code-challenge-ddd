'use strict';

/**
 * This class is abstract but JS has not a reserved word to denote it
 * 
 * We are defining the behaviour of any app services or use case (both are synonyms)
 * Each app service / use case has a method "executor", this is the executor
 */
class ApplicationService {
  /**
   * @param {Object} pageParams
   * @returns {Object} anyObject
   */
  async execute(...params) {
    throw new Error()
  }
}

module.exports = ApplicationService;
