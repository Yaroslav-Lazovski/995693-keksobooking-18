'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adformFieldsets = adForm.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var typeOfHouse = document.getElementById('type');
  var priceOfHouse = document.getElementById('price');
  var timein = document.getElementById('timein');
  var timeout = document.getElementById('timeout');


  var setFieldsEnabled = function (fieldsets, enabled) {
    for (var i = 0; i < fieldsets.length; i++) {
      if (enabled) {
        fieldsets[i].removeAttribute('disabled', 'disabled');
      } else {
        fieldsets[i].setAttribute('disabled', 'disabled');
      }
    }
  };


  var toggleFormEnabled = function (enabled) {
    if (enabled) {
      adForm.classList.remove('ad-form--disabled');
    } else {
      adForm.classList.add('ad-form--disabled');
    }
    setFieldsEnabled(adformFieldsets, enabled);
  };


  var filterHousingType = function () {
    switch (typeOfHouse.value) {
      case 'palace':
        priceOfHouse.setAttribute('placeholder', '10 000');
        priceOfHouse.setAttribute('min', 10000);
        break;
      case 'flat':
        priceOfHouse.setAttribute('placeholder', '1 000');
        priceOfHouse.setAttribute('min', 1000);
        break;
      case 'house':
        priceOfHouse.setAttribute('placeholder', '5 000');
        priceOfHouse.setAttribute('min', 5000);
        break;
      case 'bungalo':
        priceOfHouse.setAttribute('placeholder', '0');
        priceOfHouse.setAttribute('min', 0);
        break;
    }
    return null;
  };


  var filterCheckinCheckout = function () {
    timein.addEventListener('change', function () {
      timeout.selectedIndex = timein.selectedIndex;
    });
    timeout.addEventListener('change', function () {
      timein.selectedIndex = timeout.selectedIndex;
    });
  };


  var filterCapacityOptions = function () {
    var rooms = parseInt(roomNumber.value, 10);
    var suitableCapacity;

    for (var i = 0; i < capacity.options.length; i++) {
      var capacityOption = capacity.options[i];
      var guests = parseInt(capacityOption.value, 10);

      if ((guests === 0 && rooms === 100) || (guests <= rooms && guests !== 0 && rooms !== 100)) {
        capacityOption.removeAttribute('disabled');
        suitableCapacity = capacityOption;
      } else {
        capacityOption.setAttribute('disabled', 'disabled');
      }
    }
    suitableCapacity.setAttribute('selected', 'selected');
  };


  address.value = window.map.getMainPinLocation(window.map.mapPinMain);
  setFieldsEnabled(adformFieldsets, false);

  window.form = {
    address: address,
    typeOfHouse: typeOfHouse,
    roomNumber: roomNumber,

    toggleFormEnabled: toggleFormEnabled,
    filterHousingType: filterHousingType,
    filterCheckinCheckout: filterCheckinCheckout,
    filterCapacityOptions: filterCapacityOptions
  };
})();
