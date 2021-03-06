modules.define(
    'photo',
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
        '<div class="photo">',
            '<span class="glyphicon glyphicon-refresh photo__reload"></span>',
            '<div class="photo__profile">',
                '<h1>{{city}}</h1>',
                '<h4>Photo based on weather in your city</h4>',
                '<p class="photo__tags">',
                    '<span class="glyphicon glyphicon-tag"></span>',
                    '{{#tags}}',
                    '<span class="photo__tag">{{.}}</span>',
                    '{{/tags}}',
                '</p>',
            '</div>',
            '<img src="{{url}}"/>',
        '</div>'
    ].join('');

    var PhotoView = inherit({
        /**
         * @param {Object} data
         */
        __constructor: function (data) {
            this._domNode = $(Mustache.render(TEMPLATE, data));
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

    provide(PhotoView);
});
