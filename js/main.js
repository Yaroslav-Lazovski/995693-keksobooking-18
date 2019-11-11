'use strict';

(function () {
  var offers = [];


  var onMainPinAction = function () {
    window.map.toggleMapEnabled(true);
    window.form.toggleFormEnabled(true);
    window.form.address.value = window.map.getMainSmallPinLocation(window.map.mapPinMain);
  };

  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.map.mapPinMain.style.top = (window.map.mapPinMain.offsetTop - shift.y) + 'px';
      window.map.mapPinMain.style.left = (window.map.mapPinMain.offsetLeft - shift.x) + 'px';

      if (window.map.mapPinMain.offsetTop < window.map.BORDER_TOP_Y_VALUE - window.map.mainPinHeight - window.map.MAIN_PIN_ARROW_VALUE) {
        window.map.mapPinMain.style.top = window.map.BORDER_TOP_Y_VALUE - window.map.mainPinHeight - window.map.MAIN_PIN_ARROW_VALUE + 'px';
      } else if (window.map.mapPinMain.offsetTop > window.map.BORDER_BOTTOM_Y_VALUE - window.map.mainPinHeight - window.map.MAIN_PIN_ARROW_VALUE) {
        window.map.mapPinMain.style.top = window.map.BORDER_BOTTOM_Y_VALUE - window.map.mainPinHeight - window.map.MAIN_PIN_ARROW_VALUE + 'px';
      }

      if (window.map.mapPinMain.offsetLeft < -window.map.mainPinWidth / 2) {
        window.map.mapPinMain.style.left = -window.map.mainPinWidth / 2 + 'px';
      } else if (window.map.mapPinMain.offsetLeft > window.map.mapWidth - window.map.mainPinWidth / 2) {
        window.map.mapPinMain.style.left = window.map.mapWidth - window.map.mainPinWidth / 2 + 'px';
      }

      window.form.address.value = window.map.getMainSmallPinLocation(window.map.mapPinMain);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.address.value = window.map.getMainSmallPinLocation(window.map.mapPinMain);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    onMainPinAction();
  });

  window.map.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.map.ENTER_KEYCODE) {
      onMainPinAction();
    }
  });

  window.map.mapPinMain.addEventListener('click', function () {
    onMainPinAction();
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
      if (evt.keyCode === window.map.ESC_KEYCODE) {
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

  window.map.setHousingPriceChangeListener(function () {
    var offersByType = [];
    offers.forEach(function (offer) {
      if (offer.offer.price >= 50000) {
        offersByType.push(offer);
      } else if (offer.offer.price <= 50000 && offer.offer.price >= 10000) {
        offersByType = [];
        offersByType.push(offer);
      } else if (offer.offer.price <= 10000) {
        offersByType = [];
        offersByType.push(offer);
      }
    });
    window.utility.setLimitPins(offersByType);
    window.map.clearMap();
    window.map.renderPins(offersByType);
  });

  window.map.setHousingRoomsChangeListener(function (rooms) {
    var offersByType = [];
    offers.forEach(function (offer) {
      if (offer.offer.rooms === parseFloat(rooms)) {
        offersByType.push(offer);
      }
    });
    window.utility.setLimitPins(offersByType);
    window.map.clearMap();
    window.map.renderPins(offersByType);
  });

  window.map.setHousingGuestsChangeListener(function (guests) {
    var offersByType = [];
    offers.forEach(function (offer) {
      if (offer.offer.guests === parseFloat(guests)) {
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


  window.form.adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.form.adForm), window.success.showSuccessMessage);
    evt.preventDefault();

    window.form.formReset();

    window.map.mapPinMain.style.top = window.map.mapHeight / 2 + 'px';
    window.map.mapPinMain.style.left = window.map.mapWidth / 2 + 'px';

    window.map.toggleMapDisabled();
    window.form.toggleFormDisabled();

    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }

    setTimeout(window.form.address.value = window.map.getMainSmallPinLocation(window.map.mapPinMain), 1000);
    document.getElementById('price').setAttribute('placeholder', '1 000');
  });


  window.load(function (data) {
    offers = data;
    if (offers.length > 5) {
      data = data.slice(0, 5);
    }

    window.map.renderPins(data);

    window.map.setPinClickListener(onPinCLick);

  }, window.error.showErrorMessage);
})();
