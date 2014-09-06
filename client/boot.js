modules.require(['app', 'jquery'], function (App, $) {
    var app = new App($('#container'));
    app.start();
});
