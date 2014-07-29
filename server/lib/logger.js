var Log = require('log');
var config = require('configs/logger');

module.exports = new Log(config.level);
