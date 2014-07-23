module.exports = require('../api/geolocation.api.js')
    .setAction(function () {
        return {
            status: 'success',
            country: 'Russian Federation',
            countryCode: 'RU',
            region: '48',
            regionName: 'Moscow City',
            city: 'Moscow',
            zip: '',
            lat: '55.7522',
            lon: '37.6156',
            timezone: 'Europe/Moscow',
            isp: 'YANDEX LLC',
            org: 'YANDEX LLC',
            as: 'AS13238 Yandex LLC',
            query: '84.201.173.61'
        };
    });
