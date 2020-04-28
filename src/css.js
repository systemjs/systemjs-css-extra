'use strict';

(function (global) {
  const systemPrototype = global.System.constructor.prototype;
  const originalInstantiate = systemPrototype.instantiate;

  systemPrototype.instantiate = function () {
    // const loader = this;
    const url = arguments[0];
    if (url.slice(-4) === '.css'){
      return new Promise(function(resolve, reject){
        if(
          document.querySelector('link[href="'+url+'"]') || 
          document.querySelector('link[href="'+url.replace(location.protocol+'//'+location.hostname, '')+'"]')
        ){
          reject(Error('Style '+url+' has already been loaded using another way.'));
          return;
        }
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
        link.onload = function(){
          // console.log('%c Style '+url+' has been loaded', 'color: green');
          resolve([[], function (){
            return {};
          }]);
        };
        link.onerror = function(e) {
          let href = document.querySelector('link[href="'+url+'"]');
          if(href){
            href.parentElement.removeChild(href);
          }
          reject(e);
        };
      });
    } else {
      return originalInstantiate.apply(this, arguments);
    }
  };
})(typeof self !== 'undefined' ? self : global);