# weatherpic [![Build Status](https://travis-ci.org/baby-loris/weatherpic.svg?branch=master)](https://travis-ci.org/baby-loris/weatherpic)
![Weatherpic](weatherpic.png)
Weatherpic is an example of using [bla](https://github.com/baby-loris/bla).

The application detects your geolocation by IP address, then checks out weather in your city and finally shows you a photo from Flickr API based on weather in your city.

## [View demo](http://weatherpic.herokuapp.com/)

### Quick start
```
npm install
npm start
```

### Project structure
```
.git-hooks              Git hooks
api                     API methods
api-stub                API methods stubs for development
build                   Build directory
client                  Client-side code
client/common           Common blocks
client/controllers      Controllers
client/views            Views
configs                 Project configs
server                  Server-side code
```

### Technical details
Weatherpic uses the several external APIs:
  * [Yandex.Locator](http://api.yandex.ru/locator/)
  * [Yandex geocoder](http://api.yandex.com/maps/doc/geocoder/)
  * [OpenWeatherMap API](http://openweathermap.org/api)
  * [Flick Photo API](https://www.flickr.com/services/api/)
  * and [Browser Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) in some cases.

#### Bussiness logic
Using bla there are created wrappers for all APIs (API methods in bla's terminology). It helps to control the external services and adds an extra checking if it's neccessary. List of all API methods are always shown in [the documentation page](http://weatherpic.herokuapp.com/api).

On the server side it is tried to get all needed information for the application.

  1. Detects user location by IP using Yandex.Locator.
  2. Finds city name by coordinates using Yandex geocoder.
  3. Finds weather out in the city.
  4. Generates tags based on the city weather.
  5. Finds photos using generated tags.

See [data-provider.js](server/lib/data-provider.js) for more details. Majority of the logic is concentrated in [photos-by-location.api.js](api/photos-by-location.api.js).

However, sometimes detecting user location by IP addres is failed. In such cases browser geolocation will be used and ```photos-by-location.api.js``` will be executed on the frontend side.

Frontend side logic flow is presented on the diagram below:
![Sequence diagram](http://www.plantuml.com/plantuml/png/ZP313e8m44Jl_OezsaJy00uag6V2oQkfj04IP4cx4J_VjY3GgectPcPdtcxpYb33KUDeb6PiVa2ImGsH6Akq4gGW7mRc16VODwJGgt4dyLwWL3oo30czHi-2HAdnqKeBS0DsRglvgkz6hOWvPPWLI2P62jAg2w5iaF24FMdikXKIoS7AUz_0mufbooYvb0Khxrp3ON2wuJyZM_xLD3WMwadU-ODYxvye9Eetezp-nGV2hnDUTMdjzqRHRBMcMtoElm00)

So, [Geolocation API method](api/geolocation.api.js) is executed only on the server side but ```photos-by-location.api.js``` can be executed on both sides.

This fact emphasizes that you [bla](https://github.com/baby-loris/bla) provides very easy approach to use API methods and it doesn't matter of application side.

#### Environments
In Yandex we usually use different versions of services depend on environment. For example, when we develop or test an applicaton, we will not use production base. We run only separate services which use test bases. Such approach guarantees that we never affect real users in development or testing.

In this project I've tried to show this approach.

There are two supported environments:

  * development (stubbed api methods, logging all info, using 8080 port for run the application)
  * production (real api methods, logging only error, using port provided by Heroku with 8080 as a fallback)

The application gets configs from the path ```configs/current``` which is symlink to the specific configs. By default ```development``` configs will be used. But when npm packages is installed with ```--production``` flag (heroku uses this flag), the symlink will be changed to ```production``` configs.

Why did I stub all API methods for development environment?

It makes development process much more quicker and comfortable. Stubbed API provide data instantly and you don't have to wait response of external service and don't depend on network delays. I strongly recommend you use this approach in your projects.

### Contribution
If you've noticed any bug or have an idea, let me know ;)
