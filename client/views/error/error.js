modules.define(
    'error',
    [
        'inherit',
        'jquery',
        'mustache'
    ],
    function (
        provide,
        inherit,
        $,
        Mustache
    ) {

    var TEMPLATE = [
        '<div class="alert alert-danger error" role="alert">',
            '<span class="glyphicon glyphicon-remove-sign"></span>',
            '&nbsp;',
            '<span class="error__message">{{message}}</span>',
        '</div>'
    ].join('');

    /**
     * Error message.
     */
    var ErrorView = inherit({
        __constructor: function (data) {
            this._domNode = $(Mustache.render(TEMPLATE, data));
        },

        destruct: function () {
            this._domNode.remove();
            this._domNode = null;
        },

        getDomNode: function () {
            return this._domNode;
        }
    });

    provide(ErrorView);
});
