var ApiMethod = require('baby-loris-api/lib/api-method');
var ApiError = require('baby-loris-api/lib/api-error');
var ask = require('vow-asker');
var config = require('configs/api');

/**
 * Build url for a photo.
 * @see https://www.flickr.com/services/api/misc.urls.html
 *
 * @param {Object} data Data for the flickr photo.
 * @return {String}
 */
function getPhotoUrl(data) {
    return config.flickrPhotoApi.photoUrlTemplate
        .replace('{farm-id}', data.farm)
        .replace('{server-id}', data.server)
        .replace('{id}', data.id)
        .replace('{secret}', data.secret)
        .replace('{size}', 'b');
}

module.exports = new ApiMethod('photos')
    .setDescription('Returns photos of kittens using Flickr API')
    .addParam({
        name: 'text',
        descriptions: 'Text for searching'
    })
    .addParam({
        name: 'tags',
        type: 'Array',
        descriptions: 'Photos with one or more of the tags listed will be returned'
    })
    .setAction(function (params) {
        return ask({
            url: config.flickrPhotoApi.host,
            query: {
                method: 'flickr.photos.search',
                tags: (params.tags || []).toString(),
                tags_mode: 'all',
                text: params.text,
                api_key: config.flickrPhotoApi.key,
                format: 'json',
                nojsoncallback: 1,
                per_page: 10
            },
            timeout: config.timeout
        })
            .then(function (response) {
                var data = JSON.parse(response.data);

                if (data.stat === 'fail') {
                    throw new ApiError('FLICKR_ERROR', data.message);
                }

                return data.photos.photo.map(function (photo) {
                    return {
                        title: photo.title,
                        url: getPhotoUrl(photo)
                    };
                });
            });
    });
