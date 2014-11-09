var bla = require('bla');
var ask = require('vow-asker');
var config = require('../configs/current/api');

module.exports = new bla.ApiMethod({
    name: 'city-by-location',
    description: 'Returns information about city based on coordinates',
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
            url: config.yandexGeocoder.host,
            query: {
                geocode: params.longitude + ',' + params.latitude,
                kind: 'locality',
                format: 'json',
                results: 1,
                lang: 'en_US'
            },
            timeout: config.timeout
        })
            .then(function (response) {
                var data = JSON.parse(response.data);
                var firstResult = data.response.GeoObjectCollection.featureMember[0];

                if (!firstResult) {
                    throw new bla.ApiError(bla.ApiError.NOT_FOUND, 'City wasn\' found');
                }

                return firstResult.GeoObject;
            });
    }
});
