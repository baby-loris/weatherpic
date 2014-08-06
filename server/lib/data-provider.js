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
                return api.exec('weather', {lat: location.lat, lon: location.lon})
                    .then(function (weather) {
                        api.exec('tags', {weather: weather})
                            .then(function (tags) {
                                d.resolve({
                                    city: location.city || weather.name,
                                    tags: tags
                                });
                            });
                    });
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
