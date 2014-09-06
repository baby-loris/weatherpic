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

    var PhotoController = inherit({
        /**
         * @param {jQuery} parentDomNode
         * @param {Object} data
         */
        __constructor: function (parentDomNode, data) {
            this._parentDomNode = parentDomNode;
            this._data = data;
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
