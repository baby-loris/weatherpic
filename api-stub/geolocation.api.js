var bla = require('bla');
var method = require('../api/geolocation.api.js');

module.exports = new bla.ApiMethod({
    name: method.getName(),
    description: method.getDescription(),
    params: method.getParamsDeclarations(),
    action: function () {
        return {
            latitude: 55.7340469,
            longitude: 37.5886269,
            altitude: 0,
            precision: 100000,
            altitude_precision: 30,
            type: 'ip'
        };
    }
});
