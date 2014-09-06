var api = require('./api');
var vow = require('vow');

module.exports = {
    /**
     * Returns an initial data for the application.
     *
     * @param {express.Request} req
     * @returns {vow.Promise}
     */
    get: function (req) {
        var d = vow.defer();

        api.exec('geolocation', {ip: req.ip})
            .then(function (location) {
                api.exec('photos-by-location', location).then(d.resolve.bind(d));
            })
            .fail(function (error) {
                d.resolve({
                    error: {
                        type: error.type,
                        message: error.message
                    }
                });
            });

        return d.promise();
    }
};
