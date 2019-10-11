'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainSmall = mapPinMain.querySelector('img');
  var adformFieldsets = adForm.querySelectorAll('fieldset');

  var onMainPinClick = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    address.value = getMainSmallPinLocation(mapPinMainSmall);
    window.form.setFieldsEnabled(adformFieldsets, true);
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utility.ENTER_KEYCODE) {
      onMainPinClick();
    }
  });

  var getMainPinLocation = function (mainPin) {
    var x = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var y = Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);

    return x + ', ' + y;
  };

  var getMainSmallPinLocation = function (smallPin) {
    var x = Math.round(smallPin.offsetLeft + smallPin.offsetWidth / 2);
    var y = Math.round(smallPin.offsetTop + smallPin.offsetHeight / 2 + 22);

    return x + ', ' + y;
  };
  mapPinMain.addEventListener('mousedown', onMainPinClick);

  // window.card.offerAd();
  // window.card.renderAd();

  window.map = {
    map: map,
    cardTemplate: cardTemplate,
    mapFiltersContainer: mapFiltersContainer,
    getMainPinLocation: getMainPinLocation
  };
})();
