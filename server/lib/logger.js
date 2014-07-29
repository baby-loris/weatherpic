var Log = require('log');
var config = require('../../configs/current/logger');

module.exports = new Log(config.level);
