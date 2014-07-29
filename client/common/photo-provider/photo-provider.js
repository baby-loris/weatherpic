modules.define(
    'photo-provider',
    [
        'inherit',
        'api',
        'vow',
        'baby-loris-api-error'
    ],
    function (
        provide,
        inherit,
        api,
        vow,
        ApiError
    ) {

    /**
     * Photo provider.
     *
     * It's an wrapper for photos Api.
     */
    var PhotoProvider = inherit({
        __constructor: function () {
            this._loadedPhotos = [];
            this._page = 1;
        },

        /**
         * Returns information about photo.
         *
         * @param {Object} options Request options.
         * @returns {vow.Promise} Will be resolved by photo object.
         */
        getPhoto: function (options) {
            var photos = !this._loadedPhotos.length ?
                this._loadPhotos(options) :
                vow.resolve();

            return photos.then(this._getNextPhoto.bind(this));
        },

        /**
         * Loads photos from photos API
         *
         * @param {Object} options Request options.
         * @returns {vow.Promise}
         */
        _loadPhotos: function (options) {
            return api.exec('photos', {
                page: this._page,
                tags: options.tags
            })
                .then(function (photos) {
                    this._loadedPhotos = photos;
                    this._page++;
                }.bind(this));
        },

        /**
         * Preloads the next photo and returns it after prefetching.
         *
         * @returns {vow.Promise}
         */
        _getNextPhoto: function () {
            var d = vow.defer();
            var photo = this._loadedPhotos.shift();

            var image = new Image();
            image.onload = d.resolve.bind(d, photo);
            image.onerror = d.reject.bind(d, new ApiError('PHOTO_PROVIDER', 'Cannot load a photo. Try again later.'));
            image.src = photo.url;

            return d.promise();
        }
    });

    provide(new PhotoProvider());
});
