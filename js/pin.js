'use strict';

(function () {
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

  renderPins(window.data.offers);

  window.pin = {
    renderPins: renderPins(window.data.offers)
  };
})();
