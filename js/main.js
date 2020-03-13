'use strict';

var TITLES = [];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_COUNT = 8;
var MIN_X_LOCATION = 0;
var MAX_X_LOCATION = 1140;
var MIN_Y_LOCATION = 130;
var MAX_Y_LOCATION = 630;
var RADIX = 10;
var MAINPIN_HEIGHT = 22;
var ENTER = 'Enter';
var MAX_LIST = 100;
var GAP_LIST = 2;
var MIN_LENGTH_TITLE = 30;
var MAX_LENGTH_TITLE = 100;

var typesMap = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

var getRandomArray = function (array) {
  return array.slice(0, getRandomNumber(1, array.length));
};

var createSimilarPinsArray = function (count) {
  var advertisements = [];
  var TypeKeys = Object.keys(typesMap);

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
            type: TypeKeys[getRandomNumber(0, TypeKeys.length - 1)],
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
var map = document.querySelector('.map');


var renderSimilarPin = function (similarPin) {
  var pinElement = similarTemplatePin.cloneNode(true);
  pinElement.style.left = similarPin.location.locationX + 'px';
  pinElement.style.top = similarPin.location.locationY + 'px';
  pinElement.querySelector('img').src = similarPin.author.avatar;
  pinElement.alt = similarPin.offer.title;

  return pinElement;
};

var removeClassActive = function () {
  var activePin = map.querySelector('.map__pin--active');

  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};

var similarPinsElement = document.querySelector('.map__pins');

var renderPins = function (pins) {
  var fragmentPin = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragmentPin.appendChild(renderSimilarPin(pins[i]));
  }

  similarPinsElement.appendChild(fragmentPin);
};

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

var similarTemplateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');
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

/* var renderCard = function (cards) {
  fragment.appendChild(createCard(cards));

  elementBeforeCard.before(fragment);
};
renderCard(offers[0]); */

var adForm = document.querySelector('.ad-form');
var fieldsetHeaders = document.querySelector('.ad-form-header');
var fieldsetInputs = document.querySelectorAll('.ad-form__element');
var fieldsetAddress = document.querySelector('#address');
var mapFilters = document.querySelector('.map__filters').children;
var elementBeforeCard = document.querySelector('.map__filters-container');
var mapPinMain = document.querySelector('.map__pin--main');
var fieldsetCapacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var notice = document.querySelector('.notice');


var getCoordinates = function (point, size) {
  return parseInt(point, RADIX) + Math.round(size * 0.5);
};

var mainPinX = getCoordinates(mapPinMain.style.left, mapPinMain.offsetWidth);
var mainPinY = getCoordinates(mapPinMain.style.top, mapPinMain.offsetHeight);
var mainPinActiveY = mainPinY + MAINPIN_HEIGHT;
var mainPinCoordinate = mainPinX + ', ' + mainPinY;
var mainPinCoordinateActive = mainPinX + ', ' + mainPinActiveY;

var toggleElementAvailability = function (elements, status) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = status;
  }
};

var deactivateMap = function () {

  fieldsetHeaders.disabled = true;
  fieldsetAddress.value = mainPinCoordinate;
  fieldsetAddress.readOnly = true;
  map.classList.add('map--faded');
  toggleElementAvailability(fieldsetInputs, true);
  toggleElementAvailability(mapFilters, true);
};

var activatePage = function () {
  renderPins(offers);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  fieldsetHeaders.disabled = false;
  fieldsetAddress.value = mainPinCoordinateActive;
  setPinClickHandlers();
  pinEnterPressHandler();
  toggleElementAvailability(mapFilters, true);
  toggleElementAvailability(fieldsetInputs, false);

  mapPinMain.removeEventListener('mousedown', activatePageMousedownHandler);
  mapPinMain.removeEventListener('keydown', activatePageKeydownHandler);

};

var activatePageKeydownHandler = function (evt) {
  if (evt.key === ENTER) {
    activatePage();
  }
};

var activatePageMousedownHandler = function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
};

mapPinMain.addEventListener('mousedown', activatePageMousedownHandler);
mapPinMain.addEventListener('keydown', activatePageKeydownHandler);

var findDisabledElement = function () {

  var index = roomNumber.options.selectedIndex;
  var selectedValue = roomNumber.options[index].value;
  var fieldsetCapacityLength = fieldsetCapacity.options.length;
  if (selectedValue < MAX_LIST) {
    fieldsetCapacity.options[fieldsetCapacityLength - (index + GAP_LIST)].selected = true;
    for (var j = 0; j < fieldsetCapacityLength; j++) {
      fieldsetCapacity.options[j].disabled = (selectedValue < fieldsetCapacity.options[j].value) || (fieldsetCapacity.options[j].value === '0');
    }
  } else {
    fieldsetCapacity.options[fieldsetCapacityLength - 1].selected = true;
    fieldsetCapacity.options[fieldsetCapacityLength - 1].disabled = false;
    for (var k = 0; k < fieldsetCapacityLength - 1; k++) {
      fieldsetCapacity.options[k].disabled = true;
    }
  }
};

roomNumber.addEventListener('change', function () {
  findDisabledElement();
});

deactivateMap();

var titleInput = notice.querySelector('#title');
titleInput.required = true;

var titleInputLength = {
  min: MIN_LENGTH_TITLE,
  max: MAX_LENGTH_TITLE
};

titleInput.addEventListener('change', function () {
  if (titleInput.value.length < titleInputLength.min || titleInput.value.length > titleInputLength.max) {
    titleInput.setCustomValidity('Необходимо от 30 до 100 символов');
  } else {
    titleInput.setCustomValidity('');
  }
});

var priceInput = notice.querySelector('#price');

priceInput.required = true;
priceInput.type = 'number';
priceInput.max = 1000000;

var price = notice.querySelector('#price');

var type = notice.querySelector('#type');

var MinPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var setMinPriceOfType = function (evt) {
  price.placeholder = MinPrice[evt.target.value];
  price.min = MinPrice[evt.target.value];
};

type.addEventListener('change', function (evt) {
  setMinPriceOfType(evt);
});

var timeIn = notice.querySelector('#timein');
var timeOut = notice.querySelector('#timeout');
var setTime = function (evt, time) {
  time.value = evt.target.value;
};

timeIn.addEventListener('change', function (evt) {
  setTime(evt, timeOut);
});

timeOut.addEventListener('change', function (evt) {
  setTime(evt, timeIn);
});


var imageInput = notice.querySelector('#images');
imageInput.accept = 'image/*';

var avatar = notice.querySelector('#avatar');
avatar.accept = 'image/*';


// Обработчик открытия карточки по клику по метке
var setPinClickHandlers = function () {
  var userPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  userPins.forEach(function (element, i) {
    element.addEventListener('click', function () {
      openPopup(i);
    });
  });
};

var openPopup = function (i) {
  removeClassActive();
  var popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
  var fragment = document.createElement('div'); // createDocumentFragment();
  var cardElement = similarTemplateCard.cloneNode(true);
  fragment.appendChild(createCard(offers[i], cardElement));
  map.insertBefore(fragment, elementBeforeCard);
  setPopupCloseHandlers();
};

// Обработчик открытия карточки по нажатию на Enter
var pinEnterPressHandler = function () {
  var userPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  userPins.forEach(function (element, i) {
    element.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        openPopup(i);
      }
    });
  });
};

var popupPressEscHandler = function (evt) {
  if (evt.key === 'Escape') {
    var popup = document.querySelector('.popup');
    removePopup(popup);
  }
};


var removePopup = function (popup) {
  popup.remove();
  removeClassActive();
  document.removeEventListener('keydown', popupPressEscHandler);
};

// Обработчик закрытия карточки по клику или нажатию на ESC
var setPopupCloseHandlers = function () {

  var popup = document.querySelector('.popup');
  var popupClose = popup.querySelector('.popup__close');


  popupClose.addEventListener('click', function () {
    removePopup(popup);
  });

  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      removePopup(popup);
    }
  });
  document.addEventListener('keydown', popupPressEscHandler);
};
