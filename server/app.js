var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var apiMiddleware = require('baby-loris-api/lib/middleware');
var errorMiddleware = require('./middlewares/error');
var notFoundMiddleware = require('./middlewares/404');
var pageMiddleware = require('./middlewares/page');

var port = require('../configs/current/env').port;
var config = require('../configs/current/api');
var logger = require('./lib/logger');

app
    .enable('trust proxy')
    .use('/build', express.static(__dirname + '/../build'))
    .use(bodyParser.urlencoded({extended: false}))
    .use('/api/:method?', apiMiddleware(config.modulesPath))
    .get('/', pageMiddleware)
    .use(notFoundMiddleware)
    .use(errorMiddleware)
    .listen(port, function () {
        logger.info('app started on %s', port);
    });
