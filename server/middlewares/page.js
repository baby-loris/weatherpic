var dataProvider = require('../lib/data-provider');
var Mustache = require('mustache');
var vow = require('vow');
var fs = require('vow-fs');

module.exports = function (req, res) {
    vow.all([
        fs.read(__dirname + '/../templates/page.html'),
        dataProvider.get(req)
    ]).spread(function (template, data) {
        var html = Mustache.render(template.toString(), {
            error: data.error,
            config: JSON.stringify(data)
        });
        res.end(html);
    });
};
