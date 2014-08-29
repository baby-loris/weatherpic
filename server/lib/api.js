var Api = require('baby-loris-api').Api;
var apiConfig = require('../../configs/current/api');

module.exports = new Api(apiConfig.modulesPath);
