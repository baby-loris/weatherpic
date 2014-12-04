var bla = require('bla');
var method = require('../api/photos.api.js');

module.exports = new bla.ApiMethod({
    name: method.getName(),
    description: method.getDescription(),
    params: method.getParams(),
    action: function () {
        return [
            {
                title: 'Forgotten Journeys',
                url: 'https://farm4.staticflickr.com/3893/14556276189_3407ba104f_b.jpg'
            }
        ];
    }
});
