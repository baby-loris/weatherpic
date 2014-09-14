var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./lib/api');
var apiMiddleware = require('bla').apiMiddleware;
var errorMiddleware = require('../configs/current/errorhandler');
var notFoundMiddleware = require('./middlewares/404');
var pageMiddleware = require('./middlewares/page');

var port = require('../configs/current/env').port;
var logger = require('./lib/logger');

app
    .enable('trust proxy')
    .use('/build', express.static(__dirname + '/../build'))
    .use(bodyParser.json())
    .use('/api/:method?', apiMiddleware(api))
    .get('/', pageMiddleware)
    .use(notFoundMiddleware)
    .use(errorMiddleware)
    .listen(port, function () {
        logger.info('app started on %s', port);
    });
