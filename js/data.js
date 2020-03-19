'use strict';
// модуль для работы с данными

(function () {
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
  var PIN_HEIGHT = 22;
  var MAINPIN_HEIGHT = 65;
  var MAINPIN_WIDTH = 65;
  var ENTER = 'Enter';
  var MOUSE_LEFT = 0;
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
  // Возвращает случайное число от макс до мин
  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  };
  // Иконки попапа, случайные (features)
  var getRandomArray = function (array) {
    return array.slice(0, getRandomNumber(1, array.length));
  };

  // Возвращает Массив пинов со случайными параметрами
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

  var offers = createSimilarPinsArray(OFFER_COUNT); // Массив пинов со случаными параметрами

  var getCoordinates = function (point, size) {
    return parseInt(point, RADIX) + Math.round(size * 0.5);
  };

  // var getMainPinCoordinates = (parseInt(window.form.mapPinMain.style.left, RADIX) + Math.round(MAINPIN_WIDTH / 2)) + ', ' + (parseInt(window.form.mapPinMain.style.top, RADIX) + Math.round(MAINPIN_HEIGHT / 2) + PIN_HEIGHT);

  window.data = {
    typesMap: typesMap,
    getCoordinates: getCoordinates,
    offers: offers,
    ENTER: ENTER,
    MOUSE_LEFT: MOUSE_LEFT,
    PIN_HEIGHT: PIN_HEIGHT,
    RADIX: RADIX,
    MAINPIN_WIDTH: MAINPIN_WIDTH,
    MAINPIN_HEIGHT: MAINPIN_HEIGHT,
    MAX_LIST: MAX_LIST,
    GAP_LIST: GAP_LIST,
    MIN_LENGTH_TITLE: MIN_LENGTH_TITLE,
    MAX_LENGTH_TITLE: MAX_LENGTH_TITLE,
    MIN_Y_LOCATION: MIN_Y_LOCATION,
    MAX_Y_LOCATION: MAX_Y_LOCATION,
    MIN_X_LOCATION: MIN_X_LOCATION,
    MAX_X_LOCATION: MAX_X_LOCATION,
  };
})();
