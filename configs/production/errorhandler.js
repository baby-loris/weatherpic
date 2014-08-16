module.exports = function (err, req, res, next) {
    /* jshint unused: vars */
    res.statusCode = 500;
    res.send(500, '<h1>500 Internal Server Error</h1>');
};
