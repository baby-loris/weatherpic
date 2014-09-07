var ApiMethod = require('baby-loris-api').ApiMethod;
var vow = require('vow');

module.exports = new ApiMethod('photos-by-location')
    .setDescription('Returns photos base on passed location')
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
    .setAction(function (params, request, api) {
        return vow.all([
            api.exec('weather', params),
            api.exec('city-by-location', params)
        ])
            .spread(function (weather, city) {
                return api.exec('tags', {weather: weather}).then(function (tags) {
                    return api.exec('photos', {tags: tags}).then(function (photos) {
                        return {
                            city: city.name || weather.name,
                            tags: tags,
                            photos: photos
                        };
                    });
                });
            });
    });
