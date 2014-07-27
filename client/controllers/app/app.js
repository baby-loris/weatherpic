modules.define(
    'app',
    [
        'inherit',
        'config',
        'photo-controller',
        'error'
    ],
    function (
        provide,
        inherit,
        config,
        PhotoController,
        ErrorView
    ) {

    var Application = inherit({
        __constructor: function (parentDomNode) {
            this._parentDomNode = parentDomNode;
        },

        start: function () {
            if (!config.error) {
                this._photo = new PhotoController(this._parentDomNode, config);
            } else {
                this._error = new ErrorView(config.error);
                this._error.getDomNode().appendTo(this._parentDomNode);
            }
        }
    });

    provide(Application);
});
