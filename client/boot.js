modules.require(['app', 'jquery'], function (App, $) {
    var app = new App($('body'));
    app.start();
});
