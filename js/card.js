'use strict';
// модуль создания карточки объявления

(function () {

  var similarTemplateCard = document.querySelector('#card').content.querySelector('.map__card'); // article внутри template id=card
  var elementBeforeCard = document.querySelector('.map__filters-container');

  // скрытие элемента
  var hideElement = function (element) {
    element.style.display = 'none';
  };

  // Создание карточки объявления(попапа)
  var createCard = function (card) {
    var cardElement = similarTemplateCard.cloneNode(true); // клонируем article
    var popupTitle = cardElement.querySelector('.popup__title'); // получаем заголовок из article(cardElement)
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
      popupType.textContent = window.data.typesMap[card.offer.type];
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
  // КОнец создания карточки объявления попапа

  // открытие попапа (вызывается по клику)
  var openPopup = function (i) {
    window.map.removeClassActive();
    var popup = document.querySelector('.popup');
    if (popup) { // если попап существует - удаляем его
      popup.remove();
    }
    var fragment = document.createElement('div'); // createDocumentFragment();
    var cardElement = similarTemplateCard.cloneNode(true);
    fragment.appendChild(createCard(window.data.offers[i], cardElement));
    window.map.cardList.insertBefore(fragment, elementBeforeCard);
    window.map.setPopupCloseHandlers(); // вешаем обработчик клика по крестику на попапе
  };

  // Отрисовывает фичи в попап
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

  // Вспомогательная функция для проверки на отсутствие данных
  var isNotEmpty = function (data) {
    return typeof data !== 'undefined' && data.length > 0;
  };
  window.card = {
    openPopup: openPopup,
  };
})();
