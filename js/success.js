'use strict';

(function () {
  var template = document.querySelector('#success').content.querySelector('div');

  var closeSuccessMessage = function () {
    document.querySelector('.success').remove();
  };

  var showMessage = function () {
    var main = document.querySelector('main');
    var message = template.cloneNode(true);
    main.appendChild(message);

    document.querySelector('.success').addEventListener('click', closeSuccessMessage);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.ESC_KEYCODE) {
        closeSuccessMessage();
      }
    });
  };

  window.success = {
    showMessage: showMessage
  };
})();
