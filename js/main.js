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

var getRandomArray = function (array, data) {
  data = array.slice(0, getRandomNumber(1, array.length + 1));
  return data;
};

var createSimilarPinsArray = function (count) {
  var advertisements = [];

  for (var i = 0; i < count; i++) {
    var locationX = getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION);
    var locationY = getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION);

    advertisements.push(
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

  return advertisements;
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

var fragment = document.createDocumentFragment();

var renderFeatures = function (element, features) {
  element.querySelector('.popup__features').innerHTML = '';
  var featuresFragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var newFeature = document.createElement('li');
    newFeature.className = 'popup__feature popup__feature--' + features[i];
    featuresFragment.appendChild(newFeature);

  }
  element.querySelector('.popup__features').appendChild(featuresFragment);
  if (features.length === 0) {
    element.querySelector('.popup__features').remove();
  }
};

var isNotEmpty = function (data) {
  return typeof data !== 'undefined' && data.length > 0;
};

var hideElement = function (element) {
  element.style.display = 'none';
};

var createCard = function (card) {
  var cardElement = similarTemplateCard.cloneNode(true);

  var popupTitle = cardElement.querySelector('.popup__title');
  if (isNotEmpty(card.offer.title)) {
    popupTitle.textContent = card.offer.title;
  } else {
    hideElement(popupTitle);
  }

  var popupAdress = cardElement.querySelector('.popup__text--address');
  if (isNotEmpty(card.offer.adress)) {
    popupAdress.textContent = card.offer.adress;
  } else {
    hideElement(popupAdress);
  }

  var popupPrice = cardElement.querySelector('.popup__text--price');
  if (isNotEmpty(card.offer.price)) {
    popupPrice.textContent = card.offer.price + '₽/ночь';
  } else {
    hideElement(popupPrice);
  }

  var popupType = cardElement.querySelector('.popup__type');
  if (isNotEmpty(card.offer.type)) {
    popupType.textContent = getTypes[card.offer.type];
  } else {
    hideElement(popupType);
  }

  var popupCapacity = cardElement.querySelector('.popup__text--capacity');
  if (isNotEmpty(card.offer.rooms)) {
    popupCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  } else {
    hideElement(popupCapacity);
  }

  var popupTime = cardElement.querySelector('.popup__text--time');
  if (isNotEmpty(card.offer.checkin) || isNotEmpty(card.offer.checkout)) {
    popupTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  } else {
    hideElement(popupTime);
  }

  renderFeatures(cardElement, card.offer.features);

  var popupDescription = cardElement.querySelector('.popup__description');
  if (isNotEmpty(card.offer.description)) {
    popupDescription.textContent = card.offer.description;
  } else {
    hideElement(popupDescription);
  }

  var photoElements = card.offer.photos;
  var popupPhoto = cardElement.querySelector('.popup__photo');
  if (isNotEmpty(photoElements)) {
    var templateСontainer = cardElement.querySelector('.popup__photos');
    cardElement.querySelector('.popup__photo').src = photoElements[0];
    for (var i = 1; i < photoElements.length; i++) {
      var clonedPhoto = popupPhoto.cloneNode();
      clonedPhoto.src = photoElements[i];
      templateСontainer.appendChild(clonedPhoto);
    }
  } else {
    hideElement(popupPhoto);
  }


  var popupAvatar = cardElement.querySelector('.popup__avatar ');
  if (isNotEmpty(card.author.avatar)) {
    popupAvatar.src = card.author.avatar;
  } else {
    hideElement(popupAvatar);
  }
  return cardElement;
};

var renderCard = function (cards) {
  fragment.appendChild(createCard(cards));

  elementBeforeCard.before(fragment);
};
renderCard(offers[0]);
