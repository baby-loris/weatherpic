var bla = require('bla');
var method = require('../api/weather.api.js');

module.exports = new bla.ApiMethod({
    name: method.getName(),
    description: method.getDescription(),
    params: method.getParams(),
    action: function () {
        return {
            coord: {
                lon: 37.62,
                lat: 55.75
            },
            sys: {
                message: 0.0467,
                country: 'RU',
                sunrise: 1406251381,
                sunset: 1406310545
            },
            weather: [
                {
                    id: 800,
                    main: 'Clear',
                    description: 'Sky is Clear',
                    icon: '01d'
                }
            ],
            base: 'cmc stations',
            main: {
                temp: 24,
                pressure: 1018,
                humidity: 43,
                temp_min: 22,
                temp_max: 25
            },
            wind: {
                speed: 4,
                deg: 310
            },
            clouds: {
                all: 0
            },
            dt: 1406308501,
            id: 524894,
            name: 'Moskva',
            cod: 200
        };
    }
});
