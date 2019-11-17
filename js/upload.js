'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var POST_REQUEST = 'POST';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open(POST_REQUEST, URL);
    xhr.send(data);
  };
})();
