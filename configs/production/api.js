module.exports = {
    ipApi: {
        host: 'http://ip-api.com/json/'
    },
    openWeatherMapApi: {
        host: 'http://api.openweathermap.org/data/2.5/weather',
    },
    flickrPhotoApi: {
        host: 'https://api.flickr.com/services/rest/',
        photoUrlTemplate: 'https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_{size}.jpg',
        key: '5e4b13a46ba7145a3c3af689ed9c3ac6'
    },
    modulesPath: __dirname + '/../../api/**/*.api.js',
    timeout: 5000
};
