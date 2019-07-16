'use strict';

(function () {
  var systemPrototype = System.constructor.prototype;
  var originalInstantiate = systemPrototype.instantiate;

  systemPrototype.instantiate = function () {
    var url = arguments[0];

    if (url.slice(-4) === '.css') {
      return new Promise(function (resolve, reject) {
        if (document.querySelector('link[href="' + url + '"]') || document.querySelector('link[href="' + url.replace(location.protocol + '//' + location.hostname, '') + '"]')) {
          reject(Error('Style ' + url + ' has already been loaded using another way.'));
          return;
        }

        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);

        link.onload = function () {
          resolve([[], function () {
            return {};
          }]);
        };

        link.onerror = function (e) {
          var href = document.querySelector('link[href="' + url + '"]');

          if (href) {
            href.parentElement.removeChild(href);
          }

          reject(e);
        };
      });
    } else {
      return originalInstantiate.apply(this, arguments);
    }
  };
})();