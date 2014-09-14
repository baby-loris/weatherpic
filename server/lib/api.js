var Api = require('bla').Api;
var apiConfig = require('../../configs/current/api');

module.exports = new Api(apiConfig.modulesPath);
