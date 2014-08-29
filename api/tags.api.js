var ApiMethod = require('baby-loris-api').ApiMethod;

/**
 * List of extra tags should be used for photos search.
 */
var EXTRA_TAGS = ['weather'];

/**
 * Generates list of tags based on the weather data.
 *
 * @param {Object} weather Weather data.
 * @returns {Array} tags
 */
function getTagsByWeather(weather) {
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

module.exports = new ApiMethod('tags')
    .setDescription('Generates list of tags based on the weather data')
    .addParam({
        name: 'weather',
        type: 'Object',
        description: 'Weather data from weather.api.js',
        required: true
    })
    .setAction(function (params) {
        return [].concat(
            EXTRA_TAGS,
            getTagsByWeather(params.weather)
        );
    });
