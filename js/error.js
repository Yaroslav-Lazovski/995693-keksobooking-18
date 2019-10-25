'use strict';

(function () {
  var template = document.querySelector('#error').content.querySelector('div');

  var closeErrorMessage = function () {
    document.querySelector('.error').remove();
  };

  var showErrorMessage = function (message) {
    var main = document.querySelector('main');
    var element = template.cloneNode(true);
    element.querySelector('.error__message').textContent = message;
    main.appendChild(element);
    element.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  };

  window.error = {
    showErrorMessage: showErrorMessage
  };
})();
