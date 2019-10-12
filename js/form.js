'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adformFieldsets = adForm.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');

  var setFieldsEnabled = function (fieldsets, enabled) {
    for (var i = 0; i < fieldsets.length; i++) {
      if (enabled) {
        fieldsets[i].removeAttribute('disabled', 'disabled');
      } else {
        fieldsets[i].setAttribute('disabled', 'disabled');
      }
    }
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

  filterCapacityOptions();
  address.value = window.map.getMainPinLocation(window.map.mapPinMain);

  roomNumber.addEventListener('change', filterCapacityOptions);
  setFieldsEnabled(adformFieldsets, false);

  window.form = {
    setFieldsEnabled: setFieldsEnabled,
  };
})();
