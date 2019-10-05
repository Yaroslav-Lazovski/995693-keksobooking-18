'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK = ['12:00', '13:00', '14:00'];
var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
map.classList.remove('map--faded');

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
      'price': getRandomBetween(1, 5000) * 10,
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

var offers = getOffers(8);
renderPins(offers);

var cardTemplate = document.querySelector('#card').content.querySelector('article');
var cardElement = cardTemplate.cloneNode(true);

var popupPhotos = cardElement.querySelector('.popup__photos');
var createPhoto = function () {
  var photoFragment = document.createDocumentFragment();

  for (var i = 0; i < offers[0].offer.photos.length; i++) {
    var popupImg = document.createElement('img');

    popupImg.setAttribute('src', offers[0].offer.photos[i]);
    popupImg.setAttribute('class', 'popup__photo');
    popupImg.setAttribute('width', '45');
    popupImg.setAttribute('height', '40');
    popupImg.setAttribute('alt', 'Фотография жилья');

    photoFragment.appendChild(popupImg);

  }
  popupPhotos.appendChild(photoFragment);
};

var createAd = function () {
  cardElement.querySelector('.popup__title').textContent = offers[0].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offers[0].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offers[0].offer.price + '₽/ночь';
  cardElement.querySelector('.popup__text--capacity').textContent = offers[0].offer.rooms + ' комнаты для ' + offers[0].offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[0].offer.checkin + ', выезд до ' + offers[0].offer.checkout;
  cardElement.querySelector('.popup__features').textContent = offers[0].offer.features;
  cardElement.querySelector('.popup__description').textContent = offers[0].offer.description;
  cardElement.querySelector('.popup__avatar').src = offers[0].author.avatar;
  popupType();
  createPhoto();

  // eslint-disable-next-line no-console
  console.log(cardElement);
};

var popupType = function () {
  for (var i = 0; i < offers[0].offer.type.length; i++) {
    if (chooseRandom(TYPES) === 'palace') {
      cardElement.querySelector('.popup__type').textContent = 'Дворец';
    } else if (chooseRandom(TYPES) === 'flat') {
      cardElement.querySelector('.popup__type').textContent = 'Квартира';
    } else if (chooseRandom(TYPES) === 'house') {
      cardElement.querySelector('.popup__type').textContent = 'Дом';
    } else if (chooseRandom(TYPES) === 'bungalo') {
      cardElement.querySelector('.popup__type').textContent = 'Бунгало';
    }
  }
};

createAd();
