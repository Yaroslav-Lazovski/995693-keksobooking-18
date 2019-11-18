'use strict';

(function () {
  var MIN_LENGTH_OF_TITLE = 30;
  var NOT_FOR_GUESTS_VALUE = 0;
  var MAX_NUMBERS_OF_ROOMS = 100;

  var blank = document.querySelector('.ad-form');
  var blankFieldsets = blank.querySelectorAll('fieldset');
  var avatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');
  var address = document.querySelector('#address');
  var title = document.querySelector('#title');
  var typeOfHouse = document.querySelector('#type');
  var priceOfHouse = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var features = document.querySelectorAll('.feature__checkbox');
  var photosUpload = document.querySelector('.ad-form__input');
  var previewPhotos = document.querySelector('.ad-form__photo');
  var resetButton = document.querySelector('.ad-form__reset');


  var setFieldsEnabled = function (fieldsets, enabled) {
    for (var i = 0; i < fieldsets.length; i++) {
      if (enabled) {
        fieldsets[i].removeAttribute('disabled', 'disabled');
      } else {
        fieldsets[i].setAttribute('disabled', 'disabled');
      }
    }
  };

  var toggleEnabled = function (enabled) {
    if (enabled) {
      blank.classList.remove('ad-form--disabled');
    } else {
      blank.classList.add('ad-form--disabled');
    }
    setFieldsEnabled(blankFieldsets, enabled);
  };

  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };


  var onHousingTypeChange = function () {
    switch (typeOfHouse.value) {
      case 'palace':
        priceOfHouse.setAttribute('placeholder', Price.PALACE);
        priceOfHouse.setAttribute('min', Price.PALACE);
        break;
      case 'flat':
        priceOfHouse.setAttribute('placeholder', Price.FLAT);
        priceOfHouse.setAttribute('min', Price.FLAT);
        break;
      case 'house':
        priceOfHouse.setAttribute('placeholder', Price.HOUSE);
        priceOfHouse.setAttribute('min', Price.HOUSE);
        break;
      case 'bungalo':
        priceOfHouse.setAttribute('placeholder', Price.BUNGALO);
        priceOfHouse.setAttribute('min', Price.BUNGALO);
        break;
    }
    return null;
  };


  var onCheckinCheckoutChange = function () {
    timein.addEventListener('change', function () {
      timeout.selectedIndex = timein.selectedIndex;
    });
    timeout.addEventListener('change', function () {
      timein.selectedIndex = timeout.selectedIndex;
    });
  };


  var onCapacityChange = function () {
    var rooms = parseInt(roomNumber.value, 10);
    var suitableCapacity;

    for (var i = 0; i < capacity.options.length; i++) {
      var capacityOption = capacity.options[i];
      var guests = parseInt(capacityOption.value, 10);

      if ((guests === NOT_FOR_GUESTS_VALUE && rooms === MAX_NUMBERS_OF_ROOMS) ||
        (guests <= rooms &&
          guests !== NOT_FOR_GUESTS_VALUE &&
          rooms !== MAX_NUMBERS_OF_ROOMS)) {
        capacityOption.removeAttribute('disabled');
        suitableCapacity = capacityOption;
      } else {
        capacityOption.setAttribute('disabled', 'disabled');
      }
    }
    suitableCapacity.setAttribute('selected', 'selected');
  };


  var resetFeatures = function () {
    features.forEach(function (item) {
      item.checked = false;
    });
  };


  var resetBlank = function () {
    blank.reset();
  };

  var resetPhotos = function () {
    previewAvatar.setAttribute('src', 'img/muffin-grey.svg');

    if (previewPhotos.querySelector('img')) {
      previewPhotos.querySelector('img').remove();
    }
  };


  var fullReset = function () {
    toggleEnabled();
    resetFeatures();
    resetBlank();
    resetPhotos();
  };


  var onPhotosUploadChange = function () {
    var preview = document.createElement('img');
    preview.setAttribute('src', '');
    preview.setAttribute('width', '70');
    preview.setAttribute('height', '70');
    preview.setAttribute('alt', 'Фотографии жилья');
    window.handleUpload(photosUpload.files[0], previewPhotos.appendChild(preview));
  };


  var setInvalid = function (element) {
    element.style.border = '3px solid #DD2C00';
  };


  var onTitleRemoveInvalid = function () {
    if (title.value.length >= MIN_LENGTH_OF_TITLE) {
      title.style.border = '';
    }
  };

  var onPriceRemoveInvalid = function () {
    var minPrice = parseInt(priceOfHouse.min, 10);
    var maxPrice = parseInt(priceOfHouse.max, 10);
    var price = parseInt(priceOfHouse.value, 10);

    if (price >= minPrice && price <= maxPrice) {
      priceOfHouse.style.border = '';
    }
  };


  window.form = {
    blank: blank,
    blankFieldsets: blankFieldsets,
    avatar: avatar,
    previewAvatar: previewAvatar,
    address: address,
    title: title,
    typeOfHouse: typeOfHouse,
    priceOfHouse: priceOfHouse,
    timein: timein,
    timeout: timeout,
    roomNumber: roomNumber,
    capacity: capacity,
    photosUpload: photosUpload,
    resetButton: resetButton,

    setFieldsEnabled: setFieldsEnabled,
    toggleEnabled: toggleEnabled,
    onHousingTypeChange: onHousingTypeChange,
    onCheckinCheckoutChange: onCheckinCheckoutChange,
    onCapacityChange: onCapacityChange,
    onPhotosUploadChange: onPhotosUploadChange,
    fullReset: fullReset,
    setInvalid: setInvalid,
    onTitleRemoveInvalid: onTitleRemoveInvalid,
    onPriceRemoveInvalid: onPriceRemoveInvalid
  };
})();
