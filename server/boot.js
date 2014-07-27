var cluster = require('cluster');

var env = require('configs/env');
var app = require('./app');
var logger = require('lib/logger');

if (cluster.isMaster) {
    var workersCount = env.workersCount;

    while (workersCount--) {
        cluster.fork();
    }

    cluster.on('exit', function (worker) {
        if (!worker.suicide) {
            cluster.fork();
        }
    });

    if (env.hotReload) {
        ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(function (signal) {
            process.on(signal, function () {
                Object.keys(cluster.workers).forEach(function (id) {
                    cluster.workers[id].destroy();
                });
                process.exit();
            });
        });
    }
} else {
    logger.info('worker %s started', process.pid);
    app.start();
}
