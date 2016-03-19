var bla = require('bla');
var ask = require('vow-asker');
var config = require('../configs/current/api');

/**
 * @param {Number} temperature Temperature in F
 * @returns {Number} Temperature in C
 */
function convertToCelsius(temperature) {
    return temperature - 273.15;
}

/**
 * @see http://openweathermap.org/current
 * @see http://openweathermap.org/weather-data#current
 */
module.exports = new bla.ApiMethod({
    name: 'weather',
    description: 'Returns a weather forecast for the coordinates',
    params: {
        latitude: {
            description: 'Latitude',
            required: true
        },
        longitude: {
            description: 'Longtitude',
            required: true
        }
    },
    action: function (params) {
        return ask({
            url: config.openWeatherMapApi.host,
            query: {
                lat: params.latitude,
                lon: params.longitude,
                appid: '2cf1ffcfe7564c8c1583eca95384bd9e',
                format: 'json'
            },
            timeout: config.timeout
        }).then(function (response) {
            var json = JSON.parse(response.data);

            if (json.cod !== 200) {
                throw new bla.ApiError('WEATHER_ERROR', json.message);
            }

             // convert to Celsius
            json.main.temp = convertToCelsius(json.main.temp);
            json.main.temp_min = convertToCelsius(json.main.temp_min);
            json.main.temp_max = convertToCelsius(json.main.temp_max);

            return json;
        });
    }
});
