var ApiMethod = require('baby-loris-api').ApiMethod;

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
        return api.exec('weather', params).then(function (weather) {
            return api.exec('tags', {weather: weather}).then(function (tags) {
                return api.exec('photos', {tags: tags}).then(function (photos) {
                    return {
                        city: weather.name,
                        tags: tags,
                        photos: photos
                    };
                });
            });
        });
    });
