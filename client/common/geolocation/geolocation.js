modules.define(
    'geolocation',
    [
        'inherit',
        'vow'
    ],
    function (
        provide,
        inherit,
        vow
    ) {

    var Geolocation = inherit({
        __constructor: function () {
            this._geolocation = navigator.geolocation;
        },

        /**
         * Returns geolocation information.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
         *
         * @returns {vow.Promise}
         */
        get: function () {
            var d = vow.defer();

            if (!this._geolocation) {
                d.reject(new Error('Browser doesn\'t support Geolocation API'));
            } else {
                this._geolocation.getCurrentPosition(
                    function (position) {
                        var coords = position.coords;
                        d.resolve({
                            lat: coords.latitude,
                            lon: coords.longitude
                        });
                    },
                    function (error) {
                        d.reject(new Error(error.message));
                    }
                );
            }

            return d.promise();
        }
    });

    provide(new Geolocation());
});
