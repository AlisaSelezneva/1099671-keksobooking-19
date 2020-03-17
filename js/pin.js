'use strict';
// Модуль отрисовки пинов на карте


(function () {
  var similarTemplatePin = document.querySelector('#pin').content.querySelector('.map__pin'); // Кнопка внутри template id=pin
  var similarPinsElement = document.querySelector('.map__pins'); // div внутри секции map

  // создание конкретного пина с координатами и аватаркой
  var renderSimilarPin = function (similarPin) {
    var pinElement = similarTemplatePin.cloneNode(true); // клонирует кнопку template id=pin
    pinElement.style.left = similarPin.location.locationX + 'px';
    pinElement.style.top = similarPin.location.locationY + 'px';
    pinElement.querySelector('img').src = similarPin.author.avatar;
    pinElement.alt = similarPin.offer.title;

    return pinElement;
  };

})();
