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
                return api.exec('photos-by-location', {
                    latitude: location.latitude,
                    longitude: location.longitude
                }).then(d.resolve.bind(d));
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
