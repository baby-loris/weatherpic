module.exports = require('../api/geolocation.api.js')
    .setAction(function () {
        return {
            latitude: 55.7340469,
            longitude: 37.5886269,
            altitude: 0,
            precision: 100000,
            altitude_precision: 30,
            type: 'ip'
        };
    });
