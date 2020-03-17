'use strict';
// модуль управления карточками объявления и матками, осуществляет их взаимодейтсвие
(function () {
  var map = document.querySelector('.map'); // вся карта

  // Отрисовка всех пинов
  var renderPins = function (pins) {
    var fragmentPin = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragmentPin.appendChild(window.pin.renderSimilarPin(pins[i]));
    }

    window.pin.similarPinsElement.appendChild(fragmentPin);
  };

  // убирает обводку с пина при закрытии попапа
  var removeClassActive = function () {
    var activePin = map.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // отключает карту
  var deactivateMap = function () {

    window.form.disabled = true;
    window.form.fieldsetAddress.value = window.form.mainPinCoordinate;
    window.form.fieldsetAddress.readOnly = true;
    map.classList.add('map--faded');

    window.form.toggleElementAvailability(window.form.fieldsetInputs, true); // отключает поля форпмы
    window.form.toggleElementAvailability(window.form.mapFilters, true); // отключает фильтры под картой
  };

  var activatePage = function () {
    renderPins(window.data.offers); // отрисовка пинов
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.fieldsetHeaders.disabled = false;
    window.form.fieldsetAddress.value = window.form.mainPinCoordinateActive;
    setPinClickHandlers(); // вешает обработчик на пины
    pinEnterPress(); // обработчик нажатия энтера на пинах
    window.form.toggleElementAvailability(window.form.mapFilters, true); // отключаем поля фильтра
    window.form.toggleElementAvailability(window.form.fieldsetInputs, false); // включаем поля формы

    window.form.mapPinMain.removeEventListener('mousedown', activatePageMousedownHandler);
    window.form.mapPinMain.removeEventListener('keydown', activatePageKeydownHandler);

  };

  // активация энтер
  var activatePageKeydownHandler = function (evt) {
    if (evt.key === window.data.ENTER) {
      activatePage();
    }
  };
  // активация клик
  var activatePageMousedownHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  window.form.mapPinMain.addEventListener('mousedown', activatePageMousedownHandler); // нажатие на главный пин мышкой для активации страницы
  window.form.mapPinMain.addEventListener('keydown', activatePageKeydownHandler); // нажатие на на энтер для активации страницы

  deactivateMap(); // вызов отключения карты (при старте сайта)

  // Обработчик открытия карточки по клику по пину
  var setPinClickHandlers = function () {
    var userPins = document.querySelectorAll('.map__pin:not(.map__pin--main)'); // список всех пинов на карта
    userPins.forEach(function (element, i) { // навешивается обработчик клика на каждый пин в списке
      element.addEventListener('click', function () {
        window.card.openPopup(i); // по клику вызывается функция открытия попаппа(карточки) с индексом нажатого пина
      });
    });
  };

  // Открытие карточки по нажатию на Enter
  var pinEnterPress = function () {
    var userPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    userPins.forEach(function (element, i) {
      element.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          window.card.openPopup(i);
        }
      });
    });
  };
  // функция обработчик закрытия попапа по эск
  var popupPressEscHandler = function (evt) {
    if (evt.key === 'Escape') {
      var popup = document.querySelector('.popup');
      removePopup(popup);
    }
  };

  // закрытие попапа
  var removePopup = function (popup) {
    popup.remove();
    removeClassActive();
    document.removeEventListener('keydown', popupPressEscHandler); // снятие лисенера с документа
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

  window.map = {
    removeClassActive: removeClassActive,
    map: map,
    setPopupCloseHandlers: setPopupCloseHandlers,
  };
})();
