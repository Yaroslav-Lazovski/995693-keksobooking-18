'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK = ['12:00', '13:00', '14:00'];
var ENTER_KEYCODE = 13;
var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var cardTemplate = document.querySelector('#card').content.querySelector('article');
var adformFieldsets = document.querySelector('.ad-form').querySelectorAll('fieldset');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var mapFiltersFormSelects = document.querySelector('.map__filters').querySelectorAll('select, fieldset');
var mapPinMain = document.querySelector('.map__pin--main');








var getRandomBetween = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var chooseRandom = function (arr) {
  var max = arr.length - 1;
  var rand = getRandomBetween(0, max);

  return arr[rand];
};

var getPhotos = function () {
  var photoCount = getRandomBetween(1, 5);
  var photos = [];

  for (var i = 0; i < photoCount; i++) {
    photos.push('http://github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }

  return photos;
};

var getOffer = function (i) {
  var location = {
    'x': getRandomBetween(0, mapWidth),
    'y': getRandomBetween(130, 630),
  };
  var userCount = i + 1;
  var title = 'Предложение №' + userCount;

  return {
    'author': {
      'avatar': 'img/avatars/user0' + userCount + '.png',
    },
    'location': location,
    'offer': {
      'title': title,
      'address': 'Координаты : (' + location.x + ' ' + location.y + ')',
      'price': getRandomBetween(10, 50000),
      'type': chooseRandom(TYPES),
      'rooms': getRandomBetween(1, 9),
      'guests': getRandomBetween(0, 10),
      'checkin': chooseRandom(CHECK),
      'checkout': chooseRandom(CHECK),
      'features': chooseRandom(FEATURES),
      'description': 'Лучшее предложение',
      'photos': getPhotos(title),
    }
  };
};

var getOffers = function (n) {
  var offers = [];

  for (var i = 0; i < n; i++) {
    offers.push(getOffer(i));
  }

  return offers;
};

var createPin = function (offer) {
  var pinOffsetY = 62 / 2 + 22;
  var pinOffsetX = 62 / 2;
  var yWithOffset = offer.location.y - pinOffsetY;
  var xWithOffset = offer.location.x + pinOffsetX;
  var pinButton = document.createElement('button');
  var pinImg = document.createElement('img');

  pinButton.setAttribute('type', 'button');
  pinButton.setAttribute('class', 'map__pin');
  pinButton.setAttribute('style', 'left: ' + xWithOffset + 'px;' + 'top: ' + yWithOffset + 'px;');

  pinImg.setAttribute('src', offer.author.avatar);
  pinImg.setAttribute('alt', offer.offer.title);
  pinImg.setAttribute('width', '40');
  pinImg.setAttribute('height', '40');
  pinImg.setAttribute('draggable', 'false');

  pinButton.appendChild(pinImg);

  return pinButton;
};

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    var pin = createPin(offers[i]);
    fragment.appendChild(pin);
  }

  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(fragment);
};

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

var createAd = function (offer) {
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

  return cardElement;
};

var addAttributeToFieldset = function () {
  for (var i = 0; i < adformFieldsets.length; i++) {
    adformFieldsets[i].setAttribute("disabled", "disabled");
  }
};

var addAttributeToSelect = function () {
  for (var i = 0; i < mapFiltersFormSelects.length; i++) {
    mapFiltersFormSelects[i].setAttribute("disabled", "disabled");
  }
};

var onMapPinMainMousedown = function () {
  map.classList.remove('map--faded');

  for (var i = 0; i < adformFieldsets.length; i++) {
    adformFieldsets[i].removeAttribute("disabled", "disabled");
  }

  for (var i = 0; i < mapFiltersFormSelects.length; i++) {
    mapFiltersFormSelects[i].removeAttribute("disabled", "disabled");
  }
};

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onMapPinMainMousedown();
  }
});

mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);

var offers = getOffers(8);
renderPins(offers);

var offerAd = createAd(offers[0]);
map.insertBefore(offerAd, mapFiltersContainer);
