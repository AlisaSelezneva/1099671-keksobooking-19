'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TITLES = [];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X_LOCATION = 0;
var MAX_X_LOCATION = 1140;
var MIN_Y_LOCATION = 130;
var MAX_Y_LOCATION = 630;

document.querySelector('.map').classList.remove('map--faded');

var map = document.querySelector('.map');

var similarPinsElement = map.querySelector('.map__pins');
var similarTemplatePin = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

var mixArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var template = array[i];
    array[i] = array[j];
    array[j] = template;
  }
  return array;
};

var getRandomArray = function (array, newArray) {
  newArray = array.slice(0, getRandomNumber(0, array.length + 1));
  return newArray;
};

var similarPins = [];

mixArray(TIMES);
mixArray(TITLES);
mixArray(TYPES);
mixArray(FEATURES);
mixArray(PHOTOS);

var createSimilarPinsArray = function () {
  for (var i = 0; i < 8; i++) {
    var locationX = getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION);
    var locationY = getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION);
    similarPins.push(
        {
          author: {avatar: 'img/avatars/user0' + i + '.png'},
          offer: {
            title: TITLES[i],
            address: locationX + ', ' + locationY,
            price: getRandomNumber(0, 1000000),
            type: TYPES[i],
            rooms: getRandomNumber(1, 5),
            guests: getRandomNumber(1, 8),
            checkin: TIMES[i],
            checkout: TIMES[i],
            features: getRandomArray(FEATURES),
            description: 'описание',
            photos: getRandomArray(PHOTOS)
          },
          location: {
            x: locationX,
            y: locationY
          }
        }
    );
  }
};

createSimilarPinsArray();

var renderSimilarPin = function (similarPin) {
  var pinElement = similarTemplatePin.cloneNode(true);
  pinElement.style.left = similarPin.location.x + 'px';
  pinElement.style.top = similarPin.location.y + 'px';
  pinElement.querySelector('img').src = similarPin.author.avatar;
  pinElement.alt = similarPin.offer.title;

  return pinElement;
};

var createFragment = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderSimilarPin(array[i]));
  }
  return fragment;
};

similarPinsElement.appendChild(createFragment(similarPins));
