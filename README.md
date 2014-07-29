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
Weatherpic uses three external APIs:
  * [Geolocation API from ip-api.com](http://ip-api.com/).
  * [OpenWeatherMap API](http://openweathermap.org/api).
  * [Flick Photo API](https://www.flickr.com/services/api/).

First of them are used on the server side and the last one — on the client side. But you can use all of them on both sides (baby-loris-api makes it easy to access);

Using baby-loris-api there are created wrappers for all APIs (API methods in baby-loris-api's terminology). It helps to control the external services and adds an extra checking if it's neccessary. List of all API methods are always shown in [the documentation page](http://weatherpic.herokuapp.com/api).

There are two supported environments: ```development``` and ```production```. The major differenece between them is using API methods. For ```production``` environment external real APIs will be used but for ```development``` — only mocks for this services. It makes your development process much more quicker and comfortable. It's easy peasy to change environment: just change ```current``` symlink to preferable environment in configs directory.

### Contribution
If you've noticed any bug or have an idea, let me know ;)
