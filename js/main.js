'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TITLES = [];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_COUNT = 8;
var MIN_X_LOCATION = 0;
var MAX_X_LOCATION = 1140;
var MIN_Y_LOCATION = 130;
var MAX_Y_LOCATION = 630;

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

var getRandomArray = function (array, newArray) {
  newArray = array.slice(0, getRandomNumber(1, array.length + 1));
  return newArray;
};

var createSimilarPinsArray = function (count) {
  var result = [];

  for (var i = 0; i < count; i++) {
    var locationX = getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION);
    var locationY = getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION);

    result.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png',
          },
          offer: {
            title: TITLES[i],
            address: locationX + ', ' + locationY,
            price: getRandomNumber(0, 1000000),
            type: getRandomValue(TYPES),
            rooms: getRandomNumber(1, 5),
            guests: getRandomNumber(1, 8),
            checkin: getRandomValue(TIMES),
            checkout: getRandomValue(TIMES),
            features: getRandomArray(FEATURES),
            description: 'описание',
            photos: getRandomArray(PHOTOS),
          },
          location: {
            locationX: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION),
            locationY: getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION),
          }
        }
    );
  }

  return result;
};

var offers = createSimilarPinsArray(OFFER_COUNT);
var similarTemplatePin = document.querySelector('#pin')
.content
.querySelector('.map__pin');


var renderSimilarPin = function (similarPin) {
  var pinElement = similarTemplatePin.cloneNode(true);
  pinElement.style.left = similarPin.location.x + 'px';
  pinElement.style.top = similarPin.location.y + 'px';
  pinElement.querySelector('img').src = similarPin.author.avatar;
  pinElement.alt = similarPin.offer.title;

  return pinElement;
};

var similarPinsElement = document.querySelector('.map__pins');

var renderPins = function (pins) {
  var fragmentPin = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragmentPin.appendChild(renderSimilarPin(pins[i]));
  }

  similarPinsElement.appendChild(fragmentPin);
};

renderPins(offers);

document.querySelector('.map').classList.remove('map--faded');
var similarTemplateCard = document.querySelector('#card')
.content
.querySelector('.map__card');
var elementBeforeCard = document.querySelector('.map__filters-container');

var getTypes = function (type) {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
    default:
      return type;
  }
};

var getFeature = function (features) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var createList = document.createElement('li');
    createList.classList.add('popup__feature');
    createList.classList.add('popup__feature--' + features[i]);

    fragment.appendChild(createList);
  }

  return fragment;
};

var getPhoto = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var cardElement = similarTemplateCard.querySelector('.popup__photo').cloneNode();
    cardElement.src = photos[i];

    fragment.appendChild(cardElement);
  }

  return fragment;
};

var createCard = function (card) {
  var cardElement = similarTemplateCard.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getTypes(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(getFeature(card.offer.features));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(getPhoto(card.offer.photos));
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var renderCard = function (cards) {
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(createCard(cards));

  elementBeforeCard.before(cardFragment);
};
renderCard(offers[0]);
