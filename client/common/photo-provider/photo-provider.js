modules.define(
    'photo-provider',
    [
        'inherit',
        'api',
        'vow'
    ],
    function (
        provide,
        inherit,
        api,
        vow
    ) {

    var PhotoProvider = inherit({
        __constructor: function () {
            this._loadedPhotos = [];
            this._page = 1;
        },

        getPhoto: function (options) {
            var photos = !this._loadedPhotos.length ?
                this._loadPhotos(options) :
                vow.resolve();

            return photos.then(this._getNextPhoto.bind(this));
        },

        _loadPhotos: function (options) {
            return api.exec('photos', {
                page: this._page,
                tags: options.tags
            })
                .then(function (photos) {
                    this._loadedPhotos = photos;
                }.bind(this));
        },

        _getNextPhoto: function () {
            var d = vow.defer();
            var photo = this._loadedPhotos.shift();

            if (!this._loadedPhotos.length) {
                this._page++;
            }

            var image = new Image();
            image.onload = function () {
                d.resolve(photo);
            };
            image.onerror = function () {
                d.reject();
            };
            image.src = photo.url;

            return d.promise();
        }
    });

    provide(new PhotoProvider());
});
