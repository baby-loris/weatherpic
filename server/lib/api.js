var Api = require('baby-loris-api');
var apiConfig = require('configs/api');

module.exports = new Api(apiConfig.modulesPath);
