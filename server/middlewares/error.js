var env = require('../../configs/current/env');

module.exports = function (err, req, res, next) {
    /* jshint unused: vars */
    res.statusCode = 500;
    res.send(
        500,
        '<h1>500 Internal Server Error</h1>' +
        (env.debug ?
            util.format('<h2>%s</h2><pre>%s</pre>', err.message, err.stack) :
            '')
    );
}
