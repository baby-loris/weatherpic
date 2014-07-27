modules.define('config', function (provide) {
    var config = document.getElementById('config');
    provide(config ? JSON.parse(config.innerHTML) : {});
});
