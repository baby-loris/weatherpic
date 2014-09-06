modules.define('jquery', function (provide) {
    provide(window.$);
    try {
        window.$.noConflict();
        delete window.jQuery;
    } catch (e) {}
});
