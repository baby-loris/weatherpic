var ApiMethod = require('baby-loris-api/lib/api-method');
var ApiError = require('baby-loris-api/lib/api-error');
var ask = require('vow-asker');
var config = require('../configs/current/api');

/**
 * @see api.yandex.ru/locator/
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
            url: config.yandexLocator.host,
            method: 'POST',
            bodyEncoding: 'multipart',
            allowGzip: true,
            body: {
                json: {
                    common: {
                        version: '1.0',
                        api_key: config.yandexLocator.key
                    },
                    ip: {
                        address_v4: params.ip
                    }
                }
            },
            timeout: config.timeout
        })
            .then(function (response) {
                var json = JSON.parse(response.data);

                return json.position;
            })
            .fail(function () {
                throw new ApiError('GEOLOCATION_ERROR', 'Your city isn\'t found');
            });
    });
