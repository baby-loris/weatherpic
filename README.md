# weatherpic [![Build Status](https://travis-ci.org/tarmolov/weatherpic.svg?branch=master)](https://travis-ci.org/tarmolov/weatherpic)
Weatherpic is an example of using [baby-loris-api](https://github.com/tarmolov/baby-loris-api).

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
  * [Yandex.Locatore](http://api.yandex.ru/locator/)
  * [OpenWeatherMap API](http://openweathermap.org/api)
  * [Flick Photo API](https://www.flickr.com/services/api/)
  * and [Browser Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) in some cases.

#### Bussiness logic
Using baby-loris-api there are created wrappers for all APIs (API methods in baby-loris-api's terminology). It helps to control the external services and adds an extra checking if it's neccessary. List of all API methods are always shown in [the documentation page](http://weatherpic.herokuapp.com/api).

On the server side it is tried to get all needed information for the application.

[![server side data flow](http://www.plantuml.com/plantuml/png/VP1B2iCm34JtFeLsQI790Rmev0QzWd24AmYswuf-2Bbxx3PjJKko4OoOUIFK6V4HkX2KIWEQ0_GeU8p-oZr53PP4gNALBHXO0zt9x2fBVl06XRshQXWvQ8XqRZbCUvLiqFmHt_PDx8rGJXGpSa3vXjgawgHSkV9kjMpXR7O9saikMhoVq2eq1tw9oPJ-fs4qB8_Yk2phP-ALcsO0)](http://www.codeuml.com/?635430275175347104)

See [data-provider.js](server/lib/data-provider.js) for more details.

However, sometimes detecting user location by IP addres is failed. In such cases browser geolocation will be used and [Weather API method](api/weather.api.js) and [Tags API method](api/tags.api.js) will be executed on the frontend side.

If information is received (doesn't matter of source's side) then [Photo API method](api/photo.api.js) will be executed and user will see a photo.

So, [Geolocation API method](api/geolocation.api.js) is executed only on the server side, Photo API method — on the client side, but Weather API method and Tags API method — on both sides.

This fact emphasizes that you [baby-loris-api](https://github.com/tarmolov/baby-loris-api) provides very easy approach to use API methods and it doesn't matter of application side.

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
