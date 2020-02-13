'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TITLES = [];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

mixArray(TIME);
mixArray(TITLES);
mixArray(TYPES);
mixArray(FEATURES);
mixArray(PHOTOS);

var imageNumber = 1;
var createSimilarPinsArray = function () {
  for (var i = 0; i < 8; i++) {
    var locationX = getRandomNumber(0, 1140);
    var locationY = getRandomNumber(130, 630);
    similarPins.push(
        {
          author: {avatar: 'img/avatars/user0' + imageNumber + '.png'},
          offer: {
            title: TITLES[i],
            address: locationX + ', ' + locationY,
            price: getRandomNumber(0, 1000000),
            type: TYPES[i],
            rooms: getRandomNumber(1, 5),
            guests: getRandomNumber(1, 8),
            checkin: TIME[i],
            checkout: TIME[i],
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
    imageNumber += 1;
  }
};

createSimilarPinsArray();

var renderSimilarPin = function (similarpin) {
  var pinElement = similarTemplatePin.cloneNode(true);
  pinElement.style = 'left: ' + similarpin.location.x + 'px; top: ' + similarpin.location.y + 'px;';
  pinElement.querySelector('img').src = similarpin.author.avatar;
  pinElement.alt = similarpin.offer.title;

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
