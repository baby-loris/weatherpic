var dataProvider = require('lib/data-provider');

dataProvider.get()
    .then(function (response) {
        console.log(response);
    })
    .fail(function (error) {
        console.log('error', error);
    });
