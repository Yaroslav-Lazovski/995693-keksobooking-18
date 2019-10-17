'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainSmall = mapPinMain.querySelector('img');
  var adformFieldsets = adForm.querySelectorAll('fieldset');

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

    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(fragment);
  };

  var onMainPinClick = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    address.value = getMainSmallPinLocation(mapPinMainSmall);
    window.form.setFieldsEnabled(adformFieldsets, true);
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onMainPinClick();
    }
  });

  var getMainPinLocation = function (mainPin) {
    var x = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var y = Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);

    return x + ', ' + y;
  };

  var getMainSmallPinLocation = function (smallPin) {
    var x = Math.round(smallPin.offsetLeft + smallPin.offsetWidth / 2);
    var y = Math.round(smallPin.offsetTop + smallPin.offsetHeight / 2 + 22);

    return x + ', ' + y;
  };

  var showErrorMessage = function () {
    var template = document.querySelector('#error').content.querySelector('div');
    var main = document.querySelector('main');
    var element = template.cloneNode(true);
    main.appendChild(element);
  };

  var successHandler = function (data) {
    renderPins(data);
  };

  var errorHandler = function () {
    showErrorMessage();
  };

  window.load(successHandler, errorHandler);

  mapPinMain.addEventListener('mousedown', onMainPinClick);

  window.map = {
    map: map,
    mapPinMain: mapPinMain,
    cardTemplate: cardTemplate,
    mapFiltersContainer: mapFiltersContainer,
    getMainPinLocation: getMainPinLocation,
    getMainSmallPinLocation: getMainSmallPinLocation,
    createPin: createPin
  };
})();
