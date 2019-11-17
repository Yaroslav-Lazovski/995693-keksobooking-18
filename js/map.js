'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MAIN_PIN_ARROW_VALUE = 22;
  var BORDER_TOP_Y_VALUE = 130;
  var BORDER_BOTTOM_Y_VALUE = 630;

  var plan = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var width = plan.offsetWidth;
  var height = plan.offsetHeight;
  var filtersContainer = document.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  var smallPin = mainPin.querySelector('img');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var filters = document.querySelectorAll('.map__filter');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var mapCheckbox = housingFeatures.querySelectorAll('.map__checkbox');


  var createPin = function (advert) {
    var pinOffsetY = mainPinHeight / 2 + MAIN_PIN_ARROW_VALUE;
    var pinOffsetX = mainPinWidth / 2;
    var yWithOffset = advert.location.y - pinOffsetY;
    var xWithOffset = advert.location.x + pinOffsetX;
    var pinButton = document.createElement('button');
    var pinImg = document.createElement('img');

    pinButton.setAttribute('type', 'button');
    pinButton.setAttribute('class', 'map__pin');
    pinButton.setAttribute('style', 'left: ' + xWithOffset + 'px;' + 'top: ' + yWithOffset + 'px;');

    pinImg.setAttribute('src', advert.author.avatar);
    pinImg.setAttribute('alt', advert.offer.title);
    pinImg.setAttribute('width', '40');
    pinImg.setAttribute('height', '40');
    pinImg.setAttribute('draggable', 'false');

    pinButton.appendChild(pinImg);

    return pinButton;
  };

  var renderPins = function (adverts) {
    var fragment = document.createDocumentFragment();

    adverts.map(createPin)
      .forEach(function (pin) {
        fragment.appendChild(pin);
      });

    pins.appendChild(fragment);
  };


  var toggleEnabled = function (enabled) {
    if (enabled) {
      plan.classList.remove('map--faded');
    } else {
      plan.classList.add('map--faded');
    }
  };

  var getMainPinLocation = function (pinMain) {
    var x = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2);
    var y = Math.round(pinMain.offsetTop + pinMain.offsetHeight / 2);

    return x + ', ' + y;
  };

  var getSmallPinLocation = function (pinSmall) {
    var x = Math.round(pinSmall.offsetLeft + pinSmall.offsetWidth);
    var y = Math.round(pinSmall.offsetTop + pinSmall.offsetHeight + 22);

    return x + ', ' + y;
  };

  var clear = function () {
    var mapPin = document.querySelectorAll('.map__pin');
    mapPin.forEach(function (item) {
      if (item.classList.contains('map__pin--main')) {
        return;
      }

      item.remove();
    });
  };


  var setPinClickListener = function (listener) {
    pins.addEventListener('click', function (evt) {
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

  var isOfferSuitable = function (advert) {
    return isTypeSuitable(advert) &&
      isPriceSuitable(advert) &&
      isRoomsSuitable(advert) &&
      isGuestsSuitable(advert) &&
      areFeaturesSuitable(advert);
  };

  var isTypeSuitable = function (advert) {
    var selectedType = housingType.value;

    return selectedType === 'any' ||
      selectedType === advert.offer.type;
  };

  var isPriceSuitable = function (advert) {
    var selectedPrice = housingPrice.value;

    if (selectedPrice === 'low' && advert.offer.price <= 10000) {
      selectedPrice = advert.offer.price;
    } else if (selectedPrice === 'middle' && (advert.offer.price >= 10000 && advert.offer.price <= 50000)) {
      selectedPrice = advert.offer.price;
    } else if (selectedPrice === 'high' && advert.offer.price >= 50000) {
      selectedPrice = advert.offer.price;
    }

    return selectedPrice === 'any' ||
      selectedPrice === advert.offer.price;
  };

  var isRoomsSuitable = function (advert) {
    var selectedRooms = housingRooms.value;

    return selectedRooms === 'any' ||
      parseInt(selectedRooms, 10) === advert.offer.rooms;
  };

  var isGuestsSuitable = function (advert) {
    var selectedGuests = housingGuests.value;

    return selectedGuests === 'any' ||
      parseInt(selectedGuests, 10) === advert.offer.guests;
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

  var areFeaturesSuitable = function (advert) {
    var selectedFeatures = collectSelectedFeatures();

    for (var i = 0; i < selectedFeatures.length; i++) {
      var feature = selectedFeatures[i];

      if (!advert.offer.features.includes(feature)) {
        return false;
      }
    }

    return true;
  };


  var resetFilters = function () {
    for (var i = 0; i < filters.length; i++) {
      filters[i].value = 'any';
    }
  };

  var resetFeatures = function () {
    for (var i = 0; i < mapCheckbox.length; i++) {
      mapCheckbox[i].checked = false;
    }
  };

  var fullReset = function () {
    window.map.mainPin.style.top = window.map.height / 2 + 'px';
    window.map.mainPin.style.left = window.map.width / 2 + 'px';

    for (var i = 0; i < filters.length; i++) {
      filters[i].value = 'any';
    }

    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }

    var renderedPins = document.querySelectorAll('.map__pin');

    renderedPins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });

    toggleEnabled();
    resetFilters();
    resetFeatures();
  };


  window.map = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    MAIN_PIN_ARROW_VALUE: MAIN_PIN_ARROW_VALUE,
    BORDER_TOP_Y_VALUE: BORDER_TOP_Y_VALUE,
    BORDER_BOTTOM_Y_VALUE: BORDER_BOTTOM_Y_VALUE,

    plan: plan,
    width: width,
    height: height,
    mainPin: mainPin,
    smallPin: smallPin,
    mainPinWidth: mainPinWidth,
    mainPinHeight: mainPinHeight,
    filtersContainer: filtersContainer,

    createPin: createPin,
    renderPins: renderPins,
    toggleEnabled: toggleEnabled,
    getMainPinLocation: getMainPinLocation,
    getSmallPinLocation: getSmallPinLocation,
    clear: clear,
    setFiltersChangedListener: setFiltersChangedListener,
    isOfferSuitable: isOfferSuitable,
    setPinClickListener: setPinClickListener,
    fullReset: fullReset,
  };
})();
