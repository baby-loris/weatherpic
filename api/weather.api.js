var bla = require('baby-loris-api');
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
module.exports = new bla.ApiMethod('weather')
    .setDescription('Returns a weather forecast for the coordinates')
    .addParam({
        name: 'latitude',
        description: 'Latitude',
        required: true
    })
    .addParam({
        name: 'longitude',
        description: 'Longtitude',
        required: true
    })
    .setAction(function (params) {
        return ask({
            url: config.openWeatherMapApi.host,
            query: {
                lat: params.latitude,
                lon: params.longitude,
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
    });
