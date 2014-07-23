var ApiMethod = require('baby-loris-api/lib/api-method');
var ApiError = require('baby-loris-api/lib/api-error');
var ask = require('vow-asker');
var config = require('configs/api');

/**
 * @param {Number} temperature Temperature in F
 * @returns {Number} Temperature in C
 */
function convertToCelsius(temperature) {
    return temperature - 273.15
}

/**
 * @see http://openweathermap.org/current
 * @see http://openweathermap.org/weather-data#current
 */
module.exports = new ApiMethod('weather')
    .setDescription('Returns a weather forecast for the coordinates')
    .addParam({
        name: 'lat',
        description: 'Latitude',
        required: true
    })
    .addParam({
        name: 'lon',
        description: 'Longtitude',
        required: true
    })
    .setAction(function (params) {
        return ask({
            url: config.openWeatherMapApi.host,
            query: {
                lat: params.lat,
                lon: params.lon,
                format: 'json'
            },
            timeout: config.timeout
        }).then(function (response) {
            var json = JSON.parse(response.data);

            if (json.cod !== 200) {
                throw new ApiError('WEATHER_ERROR', json.message);
            }

             // convert to Celsius
            json.main.temp = convertToCelsius(json.main.temp);
            json.main.temp_min = convertToCelsius(json.main.temp_min);
            json.main.temp_max = convertToCelsius(json.main.temp_max);

            return json;
        });
    });
