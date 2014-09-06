modules.define('mustache', function (provide) {
    provide(window.Mustache);
    try {
        delete window.Mustache;
    } catch (e) {}
});
