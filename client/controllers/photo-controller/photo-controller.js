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
        photoProvider,
        ErrorView
    ) {

    var PhotoController = inherit({
        __constructor: function (parentDomNode, data) {
            this._parentDomNode = parentDomNode;
            this._data = data;

            this._showNextPhoto();
        },

        _showNextPhoto: function () {
            if (this._view) {
                this._view.destruct();
            }

            photoProvider.getPhoto({
                tags: this._data.tags
            })
                .then(this._onLoad.bind(this))
                .fail(this._onFail.bind(this));
        },

        _onLoad: function (photo) {
            var data = this._data;
            data.url = photo.url;

            this._view = new PhotoView(data);
            this._view.getDomNode().appendTo(this._parentDomNode);
            this._view.getDomNode().find('.photo__reload').on('click', this._showNextPhoto.bind(this));
        },

        _onFail: function (error) {
            this._error = new ErrorView(error);
            this._error.getDomNode().appendTo(this._parentDomNode);
        }
    });

    provide(PhotoController);
});
