modules.define(
    'error',
    [
        'inherit',
        'jquery',
        'bla-error',
        'mustache'
    ],
    function (
        provide,
        inherit,
        $,
        ApiError,
        Mustache
    ) {

    var TEMPLATE = [
        '<div class="alert alert-danger error" role="alert">',
            '<span class="glyphicon glyphicon-remove-sign"></span>',
            '&nbsp;',
            '<span class="error__message">{{message}}</span>',
        '</div>'
    ].join('');

    var DEFAULT_ERROR = new ApiError(ApiError.INTERNAL_ERROR, 'Unknown error');

    /**
     * Error message.
     */
    var ErrorView = inherit({
        /**
         * @param {ApiError} error
         */
        __constructor: function (error) {
            error = error || DEFAULT_ERROR;
            this._domNode = $(Mustache.render(TEMPLATE, error));
        },

        destruct: function () {
            this._domNode.remove();
            this._domNode = null;
        },

        /**
         * @returns {jQuery}
         */
        getDomNode: function () {
            return this._domNode;
        }
    });

    provide(ErrorView);
});
