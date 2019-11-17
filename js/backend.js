'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var STATUS_OK = 200;
  var TIMEOUT_VALUE = 10000;
  var GET_REQUEST = 'GET';

  window.backend = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_VALUE;

    xhr.open(GET_REQUEST, URL);
    xhr.send();
  };
})();
