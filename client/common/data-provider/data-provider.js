modules.define(
    'data-provider',
    [
        'inherit',
        'config',
        'vow',
        'geolocation',
        'baby-loris-api-error',
        'api'
    ],
    function (
        provide,
        inherit,
        config,
        vow,
        geolocation,
        ApiError,
        api
    ) {

    var DataProvider = inherit({
        /**
         * Returns data for the application.
         *
         * @returns {vow.Promise} Will be resolved by data object.
         */
        get: function () {
            return vow.resolve(config)
                .then(function (config) {
                    var error = config.error;

                    if (error && error.type !== 'GEOLOCATION_ERROR') {
                        throw new ApiError(error.type, error.message);
                    }

                    // If the user location isn't detected by external API, use browser geolocation api
                    return error && error.type === 'GEOLOCATION_ERROR' ?
                        this._getDataBasedOnUserLocation() :
                        config;
                }.bind(this));
        },

        _getDataBasedOnUserLocation: function () {
            return geolocation.get().then(function (location) {
                return api.exec('weather', {latitude: location.latitude, longitude: location.longitude})
                    .then(function (weather) {
                        return api.exec('tags', {weather: weather})
                            .then(function (tags) {
                                return {
                                    city: weather.name || 'Your location',
                                    tags: tags
                                };
                            });
                    })
                    .fail(function (error) {
                        throw new ApiError(error.type, error.message);
                    });
            });
        }
    });

    provide(new DataProvider());
});
