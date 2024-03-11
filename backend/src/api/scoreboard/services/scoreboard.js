'use strict';

/**
 * scoreboard service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::scoreboard.scoreboard');
