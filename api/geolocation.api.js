var ApiMethod = require('baby-loris-api/lib/api-method');
var ApiError = require('baby-loris-api/lib/api-error');
var ask = require('vow-asker');
var config = require('../configs/current/api');

/**
 * @see http://ip-api.com/
 */
module.exports = new ApiMethod('geolocation')
    .setDescription('Returns geolocation based on IP address')
    .addParam({
        name: 'ip',
        description: 'IP address',
        required: true
    })
    .setAction(function (params) {
        return ask({
            url: config.ipApi.host + params.ip,
            timeout: config.timeout
        })
            .then(function (response) {
                var json = JSON.parse(response.data);

                if (json.status === 'fail') {
                    throw new ApiError('GEOLOCATION_ERROR', json.message);
                }

                if (!json.city || !json.lat && !json.lon) {
                    throw new ApiError('GEOLOCATION_ERROR', 'Your city isn\'t found');
                }

                return json;
            });
    });
