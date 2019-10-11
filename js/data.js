'use strict';

(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var CHECK = ['12:00', '13:00', '14:00'];
  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;

  var getPhotos = function () {
    var photoCount = window.utility.getRandomBetween(1, 3);
    var photos = [];

    for (var i = 0; i < photoCount; i++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
    }

    return photos;
  };

  var getOffer = function (i) {
    var location = {
      'x': window.utility.getRandomBetween(0, mapWidth),
      'y': window.utility.getRandomBetween(130, 630),
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
        'price': window.utility.getRandomBetween(10, 50000),
        'type': window.utility.chooseRandom(TYPES),
        'rooms': window.utility.getRandomBetween(1, 9),
        'guests': window.utility.getRandomBetween(0, 10),
        'checkin': window.utility.chooseRandom(CHECK),
        'checkout': window.utility.chooseRandom(CHECK),
        'features': window.utility.chooseRandom(FEATURES),
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

  // var offers = getOffers(8);

  window.data = {
    offers: getOffers(8)
  };
})();
