var Api = require('baby-loris-api');
var apiConfig = require('../../configs/current/api');

module.exports = new Api(apiConfig.modulesPath);
