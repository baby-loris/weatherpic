var api = require('./api');
var vow = require('vow');

function getTags(weather) {
    return [
        weather.main.temp > 0 && weather.main.temp < 25 && 'warm',
        weather.main.temp >= 20 && 'heat',
        weather.main.temp < 0 && 'cold',
        weather.main.temp < -10 && 'frost',
        weather.clouds.all !== 0 && 'clouds',
        weather.wind.speed < 10 && 'windless',
        weather.wind.speed > 10 && 'wind',
        weather.wind.speed > 15 && 'storm'
    ].filter(Boolean);
}

module.exports = {
    get: function (req) {
        var d = vow.defer();

        api.exec('geolocation', {ip: req.hostname})
            .then(function (location) {
                return api.exec('weather', {lat: location.lat, lon: location.lon})
                    .then(function (weather) {
                        d.resolve({
                            city: location.city,
                            tags: getTags(weather)
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
