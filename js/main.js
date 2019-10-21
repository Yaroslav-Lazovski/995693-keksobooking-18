'use strict';

(function () {
  var offers = [];

  window.map.mapPinMain.addEventListener('click', function () {
    window.map.toggleMapEnabled(true);
    window.form.toggleFormEnabled(true);
    window.address.value = window.map.getMainSmallPinLocation(window.map.mapPinMainSmall);
  });

  window.map.mapPinMain.addEventListener('keydown', window.map.onMainPinPressEnter);

  window.map.setHousingTypeChangeListener(function (type) {
    var offersByType = [];
    offers.forEach(function (offer) {
      if (offer.offer.type === type) {
        offersByType.push(offer);
      }
    });
    if (offersByType.length > 5) {
      offersByType = offersByType.slice(0, 5);
    }
    window.map.clearMap();
    window.map.renderPins(offersByType);
  });

  window.load(function (data) {
    offers = data;
    if (offers.length > 5) {
      data = data.slice(0, 5);
    }
    window.map.renderPins(data);
  }, window.error.showErrorMessage);
})();
