'use strict';

(function () {
  var getRandomBetween = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  var chooseRandom = function (arr) {
    var max = arr.length - 1;
    var rand = getRandomBetween(0, max);

    return arr[rand];
  };

  var limitPins = function (offers) {
    var slicedOffers = offers.slice();
    if (offers.length > 5) {
      slicedOffers = slicedOffers.slice(0, 5);
    }
    return slicedOffers;
  };

  window.utility = {
    getRandomBetween: getRandomBetween,
    chooseRandom: chooseRandom,
    limitPins: limitPins
  };
})();
