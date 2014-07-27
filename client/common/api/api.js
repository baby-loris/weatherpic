modules.define('api', ['baby-loris-api'], function (provide, Api) {
    var api = new Api('/api/');

    provide(api);
});
