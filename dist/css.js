'use strict';

(function () {
  var systemPrototype = System.constructor.prototype;
  var originalInstantiate = systemPrototype.instantiate;

  systemPrototype.instantiate = function () {
    var loader = this;
    var url = arguments[0];

    if (url.slice(-4) === '.css') {
      return new Promise(function (resolve, reject) {
        if (document.querySelector('link[href="' + url + '"]') || document.querySelector('link[href="' + url.replace(location.protocol + '//' + location.hostname, '') + '"]')) {
          reject(Error('Style ' + url + ' has already been loaded'));
        }

        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);

        link.onload = function () {
          resolve(loader.getRegister());
        };

        link.onerror = function () {
          var href = document.querySelector('link[href="' + url + '"]');

          if (href) {
            href.parentElement.removeChild(href);
          }

          reject(Error('Style ' + url + ' has failed loading'));
        };
      });
    } else {
      return originalInstantiate.apply(this, arguments);
    }
  };
})();