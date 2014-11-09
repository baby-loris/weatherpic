var ApiMethod = require('bla').ApiMethod;
var vow = require('vow');

module.exports = new ApiMethod({
    name: 'photos-by-location',
    description: 'Returns photos base on passed location',
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
    action: function (params, req, api) {
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
    }
});
