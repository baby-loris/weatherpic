modules.define(
    'data-provider',
    [
        'inherit',
        'config',
        'vow'
    ],
    function (
        provide,
        inherit,
        config,
        vow
    ) {

    var DataProvider = inherit({
        /**
         * Returns data for the application.
         *
         * @returns {vow.Promise} Will be resolved by data object.
         */
        get: function () {
            return vow.resolve(config);
        }
    });

    provide(new DataProvider());
});
