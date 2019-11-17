'use strict';

(function () {
  var main = document.querySelector('main');
  var template = document.querySelector('#error').content.querySelector('div');

  var closeErrorMessage = function () {
    document.querySelector('.error').remove();
  };

  var showMessage = function (message) {
    var error = template.cloneNode(true);
    error.querySelector('.error__message').textContent = message;

    error.querySelector('.error__button').addEventListener('click', closeErrorMessage);
    error.addEventListener('click', closeErrorMessage);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.ESC_KEYCODE) {
        closeErrorMessage();
      }
      main.appendChild(error);
    });
  };

  window.error = {
    showMessage: showMessage
  };
})();
