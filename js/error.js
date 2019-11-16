'use strict';

(function () {
  var template = document.querySelector('#error').content.querySelector('div');

  var closeErrorMessage = function () {
    document.querySelector('.error').remove();
  };

  var showMessage = function (message) {
    var main = document.querySelector('main');
    var error = template.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
    main.appendChild(error);

    error.querySelector('.error__button').addEventListener('click', closeErrorMessage);
    error.addEventListener('click', closeErrorMessage);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.ESC_KEYCODE) {
        closeErrorMessage();
      }
    });
  };

  window.error = {
    showMessage: showMessage
  };
})();
