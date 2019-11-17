'use strict';

(function () {
  var adverts = [];


  var onMainPinAction = function () {
    window.form.toggleEnabled(true);
    window.form.address.value = window.map.getSmallPinLocation(window.map.mainPin);
  };


  var onPinCLick = function (pin) {
    var pinTitle = pin.querySelector('img').alt;
    var oldPopup = document.querySelector('.popup');
    var activePin = document.querySelector('.map__pin--active');

    pin.classList.add('map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }

    if (oldPopup) {
      oldPopup.remove();
    }

    var advertToShow = adverts.find(function (adv) {
      return adv.offer.title === pinTitle;
    });

    if (advertToShow) {
      window.card.showPopup(advertToShow);
    }

    window.card.closePopup();
  };


  window.map.setFiltersChangedListener(function () {
    var filtered = adverts.filter(window.map.isOfferSuitable);

    filtered = window.utility.limitPins(filtered);

    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }
    window.map.clear();
    window.map.renderPins(filtered);
  });


  window.form.avatar.addEventListener('change', function () {
    window.handleUpload(window.form.avatar.files[0], window.form.previewAvatar);
  });

  window.form.photosUpload.addEventListener('change', window.form.onPhotosUploadChange);


  window.map.mainPin.addEventListener('mousedown', function (evt) {
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

      window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';

      if (window.map.mainPin.offsetTop < window.map.BORDER_TOP_Y_VALUE - window.map.mainPinHeight - window.map.MAIN_PIN_ARROW_VALUE) {
        window.map.mainPin.style.top = window.map.BORDER_TOP_Y_VALUE - window.map.mainPinHeight - window.map.MAIN_PIN_ARROW_VALUE + 'px';
      } else if (window.map.mainPin.offsetTop > window.map.BORDER_BOTTOM_Y_VALUE - window.map.mainPinHeight - window.map.MAIN_PIN_ARROW_VALUE) {
        window.map.mainPin.style.top = window.map.BORDER_BOTTOM_Y_VALUE - window.map.mainPinHeight - window.map.MAIN_PIN_ARROW_VALUE + 'px';
      }

      if (window.map.mainPin.offsetLeft < -window.map.mainPinWidth / 2) {
        window.map.mainPin.style.left = -window.map.mainPinWidth / 2 + 'px';
      } else if (window.map.mainPin.offsetLeft > window.map.width - window.map.mainPinWidth / 2) {
        window.map.mainPin.style.left = window.map.width - window.map.mainPinWidth / 2 + 'px';
      }

      window.form.address.value = window.map.getSmallPinLocation(window.map.mainPin);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.address.value = window.map.getSmallPinLocation(window.map.mainPin);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    onMainPinAction();
  });

  window.form.blank.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.form.blank), window.success.showMessage);
    evt.preventDefault();

    window.map.fullReset();
    window.form.fullReset();
  });

  window.form.resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    window.map.fullReset();
    window.form.fullReset();
  });

  window.map.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.map.ENTER_KEYCODE) {
      onMainPinAction();
    }
  });

  window.map.mainPin.addEventListener('click', function () {
    onMainPinAction();
  });

  window.form.typeOfHouse.addEventListener('change', window.form.onHousingTypeChange);
  window.form.roomNumber.addEventListener('change', window.form.onCapacityChange);

  window.form.title.addEventListener('invalid', window.form.onInputShowInvalid);
  window.form.title.addEventListener('input', window.form.onTitleRemoveInvalid);

  window.form.priceOfHouse.addEventListener('invalid', window.form.onInputShowInvalid);
  window.form.priceOfHouse.addEventListener('input', window.form.onPriceRemoveInvalid);

  window.form.onHousingTypeChange();
  window.form.onCheckinCheckoutChange();
  window.form.onCapacityChange();

  window.form.address.value = window.map.getMainPinLocation(window.map.mainPin);
  window.form.setFieldsEnabled(window.form.blankFieldsets, false);

  var onMainPinMousedown = function () {
    window.backend(function (data) {
      adverts = data;
      if (adverts.length > 5) {
        data = data.slice(0, 5);
      }

      window.map.renderPins(data);
      window.map.toggleEnabled(true);
      window.map.setPinClickListener(onPinCLick);

    }, window.error.showMessage);

    window.map.mainPin.removeEventListener('mousedown', onMainPinMousedown);
  };

  window.map.mainPin.addEventListener('mousedown', onMainPinMousedown);
})();
