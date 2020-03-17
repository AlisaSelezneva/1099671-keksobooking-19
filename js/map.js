'use strict';
// модуль управления карточками объявления и матками, осуществляет их взаимодейтсвие
(function () {
  var map = document.querySelector('.map'); // вся карта

  // Отрисовка всех пинов
  var renderPins = function (pins) {
    var fragmentPin = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragmentPin.appendChild(renderSimilarPin(pins[i]));
    }

    similarPinsElement.appendChild(fragmentPin);
  };

  // убирает обводку с пина при закрытии попапа
  var removeClassActive = function () {
    var activePin = map.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // скрытие элемента
  var hideElement = function (element) {
    element.style.display = 'none';
  };

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
    map.classList.add('map--faded');
    toggleElementAvailability(fieldsetInputs, true); // отключает поля форпмы
    toggleElementAvailability(mapFilters, true); // отключает фильтры под картой
  };

  var activatePage = function () {
    renderPins(offers); // отрисовка пинов
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldsetHeaders.disabled = false;
    fieldsetAddress.value = mainPinCoordinateActive;
    setPinClickHandlers(); // вешает обработчик на пины
    pinEnterPressHandler(); // обработчик нажатия энтера на пинах
    toggleElementAvailability(mapFilters, true); // отключаем поля фильтра
    toggleElementAvailability(fieldsetInputs, false); // включаем поля формы

    mapPinMain.removeEventListener('mousedown', activatePageMousedownHandler);
    mapPinMain.removeEventListener('keydown', activatePageKeydownHandler);

  };

  // активация энтер
  var activatePageKeydownHandler = function (evt) {
    if (evt.key === ENTER) {
      activatePage();
    }
  };
  // активация клик
  var activatePageMousedownHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  mapPinMain.addEventListener('mousedown', activatePageMousedownHandler); // нажатие на главный пин мышкой для активации страницы
  mapPinMain.addEventListener('keydown', activatePageKeydownHandler); // нажатие на на энтер для активации страницы

  deactivateMap(); // вызов отключения карты (при старте сайта)

  // Обработчик открытия карточки по клику по пину
  var setPinClickHandlers = function () {
    var userPins = document.querySelectorAll('.map__pin:not(.map__pin--main)'); // список всех пинов на карта
    userPins.forEach(function (element, i) { //навешивается обработчик клика на каждый пин в списке
      element.addEventListener('click', function () {
        openPopup(i); // по клику вызывается функция открытия попаппа(карточки) с индексом нажатого пина
      });
    });
  };

  // открытие попапа (вызывается по клику)
  var openPopup = function (i) {
    removeClassActive();
    var popup = document.querySelector('.popup');
    if (popup) { // если попап существует - удаляем его
      popup.remove();
    }
    var fragment = document.createElement('div'); // createDocumentFragment();
    var cardElement = similarTemplateCard.cloneNode(true);
    fragment.appendChild(createCard(offers[i], cardElement));
    map.insertBefore(fragment, elementBeforeCard);
    setPopupCloseHandlers(); // вешаем обработчик клика по крестику на попапе
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
})();
