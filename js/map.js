'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MAIN_PIN_ARROW_VALUE = 22;
  var BORDER_TOP_Y_VALUE = 130;
  var BORDER_BOTTOM_Y_VALUE = 630;

  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainSmall = mapPinMain.querySelector('img');
  var mainPinWidth = mapPinMain.offsetWidth;
  var mainPinHeight = mapPinMain.offsetHeight;
  var housingType = document.getElementById('housing-type');
  var mapPins = document.querySelector('.map__pins');


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

  var setHousingTypeChangeListener = function (changeListener) {
    housingType.addEventListener('change', function () {
      changeListener(housingType.value);
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

      if (el !== null && el.classList.contains('map__pin')) {
        listener(el);
      }
    });
  };

  window.map = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    MAIN_PIN_ARROW_VALUE: MAIN_PIN_ARROW_VALUE,
    BORDER_TOP_Y_VALUE: BORDER_TOP_Y_VALUE,
    BORDER_BOTTOM_Y_VALUE: BORDER_BOTTOM_Y_VALUE,

    map: map,
    mapWidth: mapWidth,
    mapPinMain: mapPinMain,
    mapPinMainSmall: mapPinMainSmall,
    mainPinWidth: mainPinWidth,
    mainPinHeight: mainPinHeight,
    mapFiltersContainer: mapFiltersContainer,

    createPin: createPin,
    renderPins: renderPins,
    toggleMapEnabled: toggleMapEnabled,
    getMainPinLocation: getMainPinLocation,
    getMainSmallPinLocation: getMainSmallPinLocation,
    clearMap: clearMap,
    setHousingTypeChangeListener: setHousingTypeChangeListener,
    setPinClickListener: setPinClickListener,
  };
})();
