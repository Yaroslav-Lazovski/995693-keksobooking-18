'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('article');

  var Type = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
  };


  var createPhotos = function (advert) {
    return advert.offer.photos.map(createPhoto);
  };

  var createPhoto = function (photo) {
    var popupImg = document.createElement('img');

    popupImg.setAttribute('src', photo);
    popupImg.setAttribute('class', 'popup__photo');
    popupImg.setAttribute('width', '45');
    popupImg.setAttribute('height', '40');
    popupImg.setAttribute('alt', 'Фотография жилья');

    return popupImg;
  };

  var getOfferTypeText = function (advert) {
    switch (advert.offer.type) {
      case 'palace':
        return Type.PALACE;
      case 'flat':
        return Type.FLAT;
      case 'house':
        return Type.HOUSE;
      case 'bungalo':
        return Type.BUNGALO;
    }
    return null;
  };

  var createPopup = function (advert) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = advert.offer.title;
    card.querySelector('.popup__text--address').textContent = advert.offer.address;
    card.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    card.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__features').textContent = advert.offer.features;
    card.querySelector('.popup__description').textContent = advert.offer.description;
    card.querySelector('.popup__avatar').src = advert.author.avatar;
    card.querySelector('.popup__type').textContent = getOfferTypeText(advert);

    var photos = createPhotos(advert);
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      fragment.appendChild(photo);
    });

    var popupPhotos = card.querySelector('.popup__photos');

    popupPhotos.removeChild(popupPhotos.querySelector('.popup__photo'));
    card.querySelector('.popup__photos').appendChild(fragment);

    card.classList.remove('hidden');

    return card;
  };


  var showPopup = function (advert) {
    var pinPopup = createPopup(advert);
    window.map.plan.insertBefore(pinPopup, window.map.filtersContainer);
  };


  var closePopup = function () {
    var popupCloseButton = document.querySelector('.popup__close');
    var popup = document.querySelector('.popup');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.ESC_KEYCODE) {
        popup.remove();
      }
    });

    popupCloseButton.addEventListener('click', function () {
      popup.remove();
    });
  };


  window.card = {
    showPopup: showPopup,
    closePopup: closePopup
  };
})();
