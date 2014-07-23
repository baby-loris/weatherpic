var util = require('util');

var express = require('express');
var app = express();
var apiMiddleware = require('baby-loris-api/lib/middleware');
var errorMiddleware = require('./middlewares/error');

var env = require('../configs/current/env');
var apiConfig = require('../configs/current/api');
var logger = require('./utils/logger');
var dataProvider = require('./lib/data-provider');

app
    .enable('trust proxy')
    .use('/api/:method?', apiMiddleware(__dirname + '/../api/**/*.api.js'))
    .get('/', function (req, res, next) {
        dataProvider.get(req).then(function (response) {
            res.end(JSON.stringify(response))
        });
    })
    .use(function (req, res) {
        res.statusCode = 404;
        res.end('Not found');
    })
    .use(errorMiddleware);

exports.start = function () {
    app.listen(env.port, function () {
        logger.info('app started on %s', env.port);
    });
};

if (!module.parent) {
    exports.start();
}
