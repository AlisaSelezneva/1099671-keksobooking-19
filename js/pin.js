'use strict';
// Модуль отрисовки пинов на карте


(function () {

  // создание конкретного пина с координатами и аватаркой
  var renderSimilarCard = function (similarPin) {
    var pinElement = window.map.similarTemplatePin.cloneNode(true); // клонирует кнопку template id=pin
    pinElement.style.left = similarPin.location.locationX + 'px';
    pinElement.style.top = similarPin.location.locationY + 'px';
    pinElement.querySelector('img').src = similarPin.author.avatar;
    pinElement.alt = similarPin.offer.title;

    return pinElement;
  };

  window.pin = {
    renderSimilarCard: renderSimilarCard
  };
})();
