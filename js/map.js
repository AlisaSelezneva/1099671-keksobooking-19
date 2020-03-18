'use strict';
// модуль управления карточками объявления и матками, осуществляет их взаимодейтсвие
(function () {
  var cardList = document.querySelector('.map'); // вся карта
  var similarPinsElement = document.querySelector('.map__pins'); // div внутри секции map
  var similarTemplatePin = document.querySelector('#pin').content.querySelector('.map__pin'); // Кнопка внутри template id=pin

  // Отрисовка всех пинов
  var renderPins = function (pins) {
    var fragmentPin = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragmentPin.appendChild(window.pin.renderSimilarPin(pins[i]));
    }

    similarPinsElement.appendChild(fragmentPin);
  };

  // убирает обводку с пина при закрытии попапа
  var removeClassActive = function () {
    var activePin = cardList.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };


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
  var setPinsKeydownHandlers = function () {
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
    cardList: cardList,
    setPopupCloseHandlers: setPopupCloseHandlers,
    setPinClickHandlers: setPinClickHandlers,
    setPinsKeydownHandlers: setPinsKeydownHandlers,
    renderPins: renderPins,
    similarTemplatePin: similarTemplatePin,
  };
})();
