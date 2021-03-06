modules.define(
    'app',
    [
        'inherit',
        'data-provider',
        'photo-controller',
        'error'
    ],
    function (
        provide,
        inherit,
        DataProvider,
        PhotoController,
        ErrorView
    ) {

    function getQueryParam(name) {
        var value = window.location.search.match(new RegExp('[?&]' + name + '=([^&]*)(&?)', 'i'));
        return value ? value[1] : value;
    }

    var Application = inherit({
        __constructor: function (parentDomNode) {
            this._parentDomNode = parentDomNode;
        },

        start: function () {
            var dataProvider = this._dataProvider = new DataProvider();

            dataProvider.get()
                .then(this._onDataLoad.bind(this))
                .fail(this._onFailed.bind(this));
        },

        _onDataLoad: function (data) {
            this._photo = new PhotoController(this._parentDomNode, data, {
                autoplay: getQueryParam('autoplay') === 'yes'
            });
        },

        _onFailed: function (error) {
            this._error = new ErrorView(error);
            this._error.getDomNode().appendTo(this._parentDomNode);
        }
    });

    provide(Application);
});
