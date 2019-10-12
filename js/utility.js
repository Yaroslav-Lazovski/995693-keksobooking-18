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

  window.utility = {
    getRandomBetween: getRandomBetween,
    chooseRandom: chooseRandom
  };
})();
