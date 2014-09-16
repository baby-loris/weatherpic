modules.define(
    'photo-controller',
    [
        'inherit',
        'photo',
        'photo-provider',
        'error'
    ],
    function (
        provide,
        inherit,
        PhotoView,
        PhotoProvider,
        ErrorView
    ) {

    var DEFAULT_SLIDESHOW_TIMEOUT = 5000;

    var PhotoController = inherit({
        /**
         * @param {jQuery} parentDomNode
         * @param {Object} data
         * @param {Object} options
         */
        __constructor: function (parentDomNode, data, options) {
            this._parentDomNode = parentDomNode;
            this._data = data;
            this._options = options || {};
            this._photoProvider = new PhotoProvider(data.photos);

            this._showNextPhoto();
        },

        _showNextPhoto: function () {
            if (this._view) {
                this._view.destruct();
            }

            this._photoProvider.getPhoto({
                tags: this._data.tags
            })
                .then(this._onLoad.bind(this))
                .fail(this._onFail.bind(this));
        },

        /**
         * @param {Object} photo
         */
        _onLoad: function (photo) {
            var data = this._data;
            data.url = photo.url;

            this._view = new PhotoView(data);
            this._view.getDomNode().appendTo(this._parentDomNode);
            this._view.getDomNode().find('.photo__reload').on('click', this._showNextPhoto.bind(this));

            if (this._options.autoplay) {
                setTimeout(this._showNextPhoto.bind(this), this._options.slideshowTimeout || DEFAULT_SLIDESHOW_TIMEOUT);
            }
        },

        /**
         * @param {ApiError} error
         */
        _onFail: function (error) {
            this._error = new ErrorView(error);
            this._error.getDomNode().appendTo(this._parentDomNode);
        }
    });

    provide(PhotoController);
});
