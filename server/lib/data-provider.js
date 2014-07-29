var api = require('./api');
var vow = require('vow');

/**
 * List of extra tags should be used for photos search.
 */
var EXTRA_TAGS = ['weather', 'nature'];

/**
 * An application slogan.
 */
var SLOGAN = 'Photo based on weather in your city';

/**
 * Generates list of tags based on the weather data.
 * @param {Object} weather Weather data.
 * @returns {Array} tags
 */
function getTags(weather) {
    return [
        weather.main.temp > 0 && weather.main.temp < 25 && 'warm',
        weather.main.temp >= 25 && 'hot',
        weather.main.temp < 0 && 'cold',
        weather.main.temp < -10 && 'frost',
        weather.clouds.all !== 0 && 'clouds',
        weather.wind.speed < 10 && 'windless',
        weather.wind.speed > 10 && 'wind',
        weather.wind.speed > 15 && 'storm'
    ].filter(Boolean);
}

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
                        d.resolve({
                            city: location.city,
                            slogan: SLOGAN,
                            tags: [].concat(EXTRA_TAGS, getTags(weather))
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
