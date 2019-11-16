'use strict';

(function () {
  window.reset = function () {
    window.map.mainPin.style.top = window.map.height / 2 + 'px';
    window.map.mainPin.style.left = window.map.width / 2 + 'px';

    window.map.toggleDisabled();
    window.form.toggleDisabled();

    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }

    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }

    window.map.resetFilters();
    window.map.resetFeatures();
    window.form.resetBlank();
  };
})();
