'use strict';

(function () {
  var offers = [];
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;


  var onMainPinAction = function () {
    window.map.toggleMapEnabled(true);
    window.form.toggleFormEnabled(true);
    window.address.value = window.map.getMainSmallPinLocation(window.map.mapPinMainSmall);
  };

  window.map.mapPinMain.addEventListener('click', function () {
    onMainPinAction();
  });

  window.map.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onMainPinAction();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.closePopup();
    }
  });

  window.card.popupClose.addEventListener('click', function () {
    window.card.closePopup();
  });

  window.map.setHousingTypeChangeListener(function (type) {
    var offersByType = [];
    offers.forEach(function (offer) {
      if (offer.offer.type === type) {
        offersByType.push(offer);
      }
    });
    window.utility.setLimitPins(offersByType);
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
