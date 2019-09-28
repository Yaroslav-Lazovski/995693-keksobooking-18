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

var getPhotos = function (offerTitle) {
  var photoCount = getRandomBetween(1, 5);
  var photos = [];

  for (var i = 0; i < photoCount; i++) {
    photos.push('http://github.io/assets/images/tokyo/hotel' + offerTitle + i + '.jpg');
  }

  return photos;
};

var getOffer = function (i) {
  var location = {
    'x': getRandomBetween(0, mapWidth),
    'y': getRandomBetween(130, 630),
  };
  var title = 'Предложение №' + i;
  var user = i + 1;

  return {
    'author': {
      'avatar': 'img/avatars/user0' + user + '.png',
    },
    'location': location,
    'offer': {
      'title': title,
      'address': 'Координаты : (' + location.x + ' ' + location.y + ')',
      'price': getRandomBetween(1, 5000) * 1000,
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

var createMark = function (offer) {
  var markOffsetY = 62 / 2 + 22;
  var markOffsetX = 62 / 2;
  var yWithOffset = offer.location.y - markOffsetY;
  var xWithOffset = offer.location.x + markOffsetX;
  var markButton = document.createElement('button');
  var markImg = document.createElement('img');

  markButton.setAttribute('type', 'button');
  markButton.setAttribute('class', 'map__pin');
  markButton.setAttribute('style', 'left: ' + xWithOffset + 'px;' + 'top: ' + yWithOffset + 'px;');

  markImg.setAttribute('src', offer.author.avatar);
  markImg.setAttribute('alt', offer.offer.title);
  markImg.setAttribute('width', '40');
  markImg.setAttribute('height', '40');
  markImg.setAttribute('draggable', 'false');

  markButton.appendChild(markImg);

  return markButton;
};

var getOffersElement = function (offers) {
  var fragment = document.createDocumentFragment();

  offers.forEach(function (offer) {
    var offerMark = createMark(offer);
    fragment.appendChild(offerMark);
  });

  return fragment;
};

var offers = getOffers(8);

// eslint-disable-next-line no-console
// console.log(offers);
// console.log(getOffersElement(offers));

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(getOffersElement(offers));
