'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MAIN_PIN_ARROW_VALUE = 22;
  var BORDER_TOP_Y_VALUE = 130;
  var BORDER_BOTTOM_Y_VALUE = 630;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapWidth = map.offsetWidth;
  var mapHeight = map.offsetHeight;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainSmall = mapPinMain.querySelector('img');
  var mainPinWidth = mapPinMain.offsetWidth;
  var mainPinHeight = mapPinMain.offsetHeight;
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.getElementById('housing-features');
  var mapCheckbox = housingFeatures.querySelectorAll('.map__checkbox');


  var createPin = function (offer) {
    var pinOffsetY = 62 / 2 + 22;
    var pinOffsetX = 62 / 2;
    var yWithOffset = offer.location.y - pinOffsetY;
    var xWithOffset = offer.location.x + pinOffsetX;
    var pinButton = document.createElement('button');
    var pinImg = document.createElement('img');

    pinButton.setAttribute('type', 'button');
    pinButton.setAttribute('class', 'map__pin');
    pinButton.setAttribute('style', 'left: ' + xWithOffset + 'px;' + 'top: ' + yWithOffset + 'px;');

    pinImg.setAttribute('src', offer.author.avatar);
    pinImg.setAttribute('alt', offer.offer.title);
    pinImg.setAttribute('width', '40');
    pinImg.setAttribute('height', '40');
    pinImg.setAttribute('draggable', 'false');

    pinButton.appendChild(pinImg);

    return pinButton;
  };

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      var pin = createPin(offers[i]);
      fragment.appendChild(pin);
    }

    mapPins.appendChild(fragment);
  };

  var toggleMapEnabled = function (enabled) {
    if (enabled) {
      map.classList.remove('map--faded');
    } else {
      map.classList.add('map--faded');
    }
  };

  var toggleMapDisabled = function () {
    map.classList.add('map--faded');
  };

  var getMainPinLocation = function (mainPin) {
    var x = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var y = Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);

    return x + ', ' + y;
  };

  var getMainSmallPinLocation = function (smallPin) {
    var x = Math.round(smallPin.offsetLeft + smallPin.offsetWidth);
    var y = Math.round(smallPin.offsetTop + smallPin.offsetHeight + 22);

    return x + ', ' + y;
  };

  var clearMap = function () {
    var mapPin = document.querySelectorAll('.map__pin');
    mapPin.forEach(function (item) {
      if (item.classList.contains('map__pin--main')) {
        return;
      }

      item.remove();
    });
  };


  var setPinClickListener = function (listener) {
    mapPins.addEventListener('click', function (evt) {
      var el = evt.target;

      while (el !== null) {
        if (el.classList.contains('map__pins') ||
          el.classList.contains('map__pin')) {
          break;
        }
        if (!el.classList.contains('map__pin')) {
          el = el.parentElement;
        }
      }

      if (el !== null && el.classList.contains('map__pin') && !el.classList.contains('map__pin--main')) {
        listener(el);
      }
    });
  };


  var setFiltersChangedListener = function (listener) {
    housingType.addEventListener('change', window.debounce(listener));
    housingPrice.addEventListener('change', window.debounce(listener));
    housingRooms.addEventListener('change', window.debounce(listener));
    housingGuests.addEventListener('change', window.debounce(listener));
    housingFeatures.addEventListener('change', window.debounce(listener));
  };

  var isOfferSuitable = function (offer) {
    return isTypeSuitable(offer) &&
      isPriceSuitable(offer) &&
      isRoomsSuitable(offer) &&
      isGuestsSuitable(offer) &&
      areFeaturesSuitable(offer);
  };

  var isTypeSuitable = function (offer) {
    var selectedType = housingType.value;

    return selectedType === 'any' ||
      selectedType === offer.offer.type;
  };

  var isPriceSuitable = function (offer) {
    var selectedPrice = housingPrice.value;

    if (selectedPrice === 'low' && offer.offer.price <= 10000) {
      selectedPrice = offer.offer.price;
    } else if (selectedPrice === 'middle' && (offer.offer.price >= 10000 && offer.offer.price <= 50000)) {
      selectedPrice = offer.offer.price;
    } else if (selectedPrice === 'high' && offer.offer.price >= 50000) {
      selectedPrice = offer.offer.price;
    }

    return selectedPrice === 'any' ||
      selectedPrice === offer.offer.price;
  };

  var isRoomsSuitable = function (offer) {
    var selectedRooms = housingRooms.value;

    return selectedRooms === 'any' ||
      parseInt(selectedRooms, 10) === offer.offer.rooms;
  };

  var isGuestsSuitable = function (offer) {
    var selectedGuests = housingGuests.value;

    return selectedGuests === 'any' ||
      parseInt(selectedGuests, 10) === offer.offer.guests;
  };

  var collectSelectedFeatures = function () {
    var arr = [];
    for (var i = 0; i < mapCheckbox.length; i++) {
      if (mapCheckbox[i].checked) {
        arr.push(mapCheckbox[i].value);
      }
    }
    return arr;
  };

  var areFeaturesSuitable = function (offer) {
    var selectedFeatures = collectSelectedFeatures();

    for (var i = 0; i < selectedFeatures.length; i++) {
      var feature = selectedFeatures[i];

      if (!offer.offer.features.includes(feature)) {
        return false;
      }
    }

    return true;
  };


  window.map = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    MAIN_PIN_ARROW_VALUE: MAIN_PIN_ARROW_VALUE,
    BORDER_TOP_Y_VALUE: BORDER_TOP_Y_VALUE,
    BORDER_BOTTOM_Y_VALUE: BORDER_BOTTOM_Y_VALUE,

    map: map,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    mapPinMain: mapPinMain,
    mapPinMainSmall: mapPinMainSmall,
    mainPinWidth: mainPinWidth,
    mainPinHeight: mainPinHeight,
    mapFiltersContainer: mapFiltersContainer,

    createPin: createPin,
    renderPins: renderPins,
    toggleMapEnabled: toggleMapEnabled,
    toggleMapDisabled: toggleMapDisabled,
    getMainPinLocation: getMainPinLocation,
    getMainSmallPinLocation: getMainSmallPinLocation,
    clearMap: clearMap,
    setFiltersChangedListener: setFiltersChangedListener,
    isOfferSuitable: isOfferSuitable,
    setPinClickListener: setPinClickListener,
  };
})();
