var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK = ['12:00', '13:00', '14:00'];

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

var getOffers = function () {
  var offers = [];

  for (var i = 1; i < 9; i++) {
    var map = document.querySelector('.map');
    var mapWidth = map.offsetWidth;

    var location = {
      'x': getRandomBetween(0, mapWidth),
      'y': getRandomBetween(130, 630),
    };
    var title = 'Предложение №' + i;
    offers.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png',
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
    })
  }

  return offers;
};

var offer1 = getOffers();

console.log(offer1);
