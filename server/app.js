var express = require('express');
var app = express();
var apiMiddleware = require('baby-loris-api/lib/middleware');
var errorMiddleware = require('./middlewares/error');
var notFoundMiddleware = require('./middlewares/404');
var pageMiddleware = require('./middlewares/page');

var port = require('configs/env').port;
var config = require('configs/api');
var logger = require('./utils/logger');

app
    .enable('trust proxy')
    .use('/build', express.static(__dirname + '/../build'))
    .use('/api/:method?', apiMiddleware(config.modulesPath))
    .get('/', pageMiddleware)
    .use(notFoundMiddleware)
    .use(errorMiddleware);

exports.start = function () {
    app.listen(port, function () {
        logger.info('app started on %s', port);
    });
};

if (!module.parent) {
    exports.start();
}
