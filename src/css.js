'use strict';

(function () {
  const systemPrototype = System.constructor.prototype;
  const originalInstantiate = systemPrototype.instantiate;

  systemPrototype.instantiate = function () {
    const loader = this;
    const url = arguments[0];
    if (url.slice(-4) === '.css'){
      return new Promise(function(resolve, reject){
        if(
          document.querySelector('link[href="'+url+'"]') || 
          document.querySelector('link[href="'+url.replace(location.protocol+'//'+location.hostname, '')+'"]')
        ){
          reject(Error('Style '+url+' has already been loaded'));
        }
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
        link.onload = function(){
          // console.log('%c Style '+url+' has been loaded', 'color: green');
          resolve(loader.getRegister());
        };
        link.onerror = function() {
          let href = document.querySelector('link[href="'+url+'"]');
          if(href){
            href.parentElement.removeChild(href);
          }
          reject(Error('Style '+url+' has failed loading'));
        };
      });
    } else {
      return originalInstantiate.apply(this, arguments);
    }
  };
})();