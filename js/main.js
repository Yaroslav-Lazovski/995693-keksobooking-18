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

  var onPinCLick = function (pin) {
    var pinTitle = pin.querySelector('img').alt;
    var offerToShow;
    var oldPopup = document.querySelector('.popup');

    if (oldPopup) {
      oldPopup.remove();
    }

    for (var i = 0; i < offers.length; i++) {
      var item = offers[i];
      if (item.offer.title === pinTitle) {
        offerToShow = item;
        break;
      }
    }

    window.card.showPopup(offerToShow);

    var popupCloseButton = document.querySelector('.popup__close');
    var popup = document.querySelector('.popup');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        popup.remove();
      }
    });

    popupCloseButton.addEventListener('click', function () {
      popup.remove();
    });
  };

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

  window.form.typeOfHouse.addEventListener('change', window.form.filterHousingType);
  window.form.roomNumber.addEventListener('change', window.form.filterCapacityOptions);

  window.form.filterHousingType();
  window.form.filterCheckinCheckout();
  window.form.filterCapacityOptions();


  window.load(function (data) {
    offers = data;
    if (offers.length > 5) {
      data = data.slice(0, 5);
    }

    window.map.renderPins(data);

    window.map.setPinClickListener(onPinCLick);

  }, window.error.showErrorMessage);
})();
