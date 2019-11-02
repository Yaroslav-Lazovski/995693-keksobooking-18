'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('article');


  var createPhoto = function (offer) {
    var photos = [];
    for (var i = 0; i < offer.offer.photos.length; i++) {
      var popupImg = document.createElement('img');

      popupImg.setAttribute('src', offer.offer.photos[i]);
      popupImg.setAttribute('class', 'popup__photo');
      popupImg.setAttribute('width', '45');
      popupImg.setAttribute('height', '40');
      popupImg.setAttribute('alt', 'Фотография жилья');

      photos.push(popupImg);
    }
    return photos;
  };

  var getOfferTypeText = function (offer) {
    switch (offer.offer.type) {
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
    }
    return null;
  };

  var createPopup = function (offer) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = offer.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = offer.offer.features;
    cardElement.querySelector('.popup__description').textContent = offer.offer.description;
    cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
    cardElement.querySelector('.popup__type').textContent = getOfferTypeText(offer);

    var photos = createPhoto(offer);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(photos[i]);
    }

    var popupPhotos = cardElement.querySelector('.popup__photos');
    popupPhotos.removeChild(popupPhotos.querySelector('.popup__photo'));
    cardElement.querySelector('.popup__photos').appendChild(fragment);

    cardElement.classList.remove('hidden');

    return cardElement;
  };


  var showPopup = function (offer) {
    var pinPopup = createPopup(offer);
    window.map.map.insertBefore(pinPopup, window.map.mapFiltersContainer);
  };


  window.card = {
    showPopup: showPopup,
  };
})();
