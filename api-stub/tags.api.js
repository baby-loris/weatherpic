var bla = require('bla');
var method = require('../api/tags.api.js');

module.exports = new bla.ApiMethod({
    name: method.getName(),
    description: method.getDescription(),
    params: method.getParamsDeclarations(),
    action: function () {
        return ['weather', 'warm', 'windless'];
    }
});
