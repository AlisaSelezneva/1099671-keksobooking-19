'use strict';
// Модуль для работы с формой

(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldsetHeaders = document.querySelector('.ad-form-header');
  var fieldsetInputs = document.querySelectorAll('.ad-form__element');
  var fieldsetAddress = document.querySelector('#address');
  var mapFilters = document.querySelector('.map__filters').children;
  var mapPinMain = document.querySelector('.map__pin--main');
  var fieldsetCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var notice = document.querySelector('.notice');

  // Получение координат активационного пина
  var mainPinX = window.data.getCoordinates(mapPinMain.style.left, mapPinMain.offsetWidth);
  var mainPinY = window.data.getCoordinates(mapPinMain.style.top, mapPinMain.offsetHeight);
  //
  var mainPinActiveY = mainPinY + window.data.MAINPIN_HEIGHT;
  var mainPinCoordinate = mainPinX + ', ' + mainPinY;
  var mainPinCoordinateActive = mainPinX + ', ' + mainPinActiveY;

  // Отключение гостей по количеству комнат
  var findDisabledElement = function () {

    var index = roomNumber.options.selectedIndex;
    var selectedValue = roomNumber.options[index].value;
    var fieldsetCapacityLength = fieldsetCapacity.options.length;
    if (selectedValue < window.data.MAX_LIST) {
      fieldsetCapacity.options[fieldsetCapacityLength - (index + window.data.GAP_LIST)].selected = true;
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

  // обработка события изменения количества комнат
  roomNumber.addEventListener('change', function () {
    findDisabledElement();
  });

  // начало валидации
  var titleInput = notice.querySelector('#title');
  titleInput.required = true;

  var titleInputLength = {
    min: window.data.MIN_LENGTH_TITLE,
    max: window.data.MAX_LENGTH_TITLE
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

  // конец валидации

  // Переключатель доступности элементов
  var toggleElementAvailability = function (elements, status) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = status;
    }
  };

  // отключает карту
  var deactivateMap = function () {

    fieldsetHeaders.disabled = true;
    fieldsetAddress.value = mainPinCoordinate;
    fieldsetAddress.readOnly = true;
    window.map.cardList.classList.add('map--faded');
    toggleElementAvailability(fieldsetInputs, true); // отключает поля форпмы
    toggleElementAvailability(mapFilters, true); // отключает фильтры под картой
  };

  var activatePage = function () {
    window.map.renderPins(window.data.offers); // отрисовка пинов
    window.map.cardList.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldsetHeaders.disabled = false;
    fieldsetAddress.value = mainPinCoordinateActive;
    window.map.setPinClickHandlers(); // вешает обработчик на пины
    window.map.setPinsKeydownHandlers(); // обработчик нажатия энтера на пинах
    toggleElementAvailability(mapFilters, true); // отключаем поля фильтра
    toggleElementAvailability(fieldsetInputs, false); // включаем поля формы

    mapPinMain.removeEventListener('mousedown', mainPinMousedownHandler);
    mapPinMain.removeEventListener('keydown', mainPinKeydownHandler);

  };

  // активация клик
  var mainPinMousedownHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  // активация энтер
  var mainPinKeydownHandler = function (evt) {
    if (evt.key === window.data.ENTER) {
      activatePage();
    }
  };

  mapPinMain.addEventListener('mousedown', mainPinMousedownHandler); // нажатие на главный пин мышкой для активации страницы
  mapPinMain.addEventListener('keydown', mainPinKeydownHandler); // нажатие на на энтер для активации страницы

  deactivateMap(); // вызов отключения карты (при старте сайта)

  window.form = {
    deactivateMap: deactivateMap,
    activatePage: activatePage,
  };
})();
