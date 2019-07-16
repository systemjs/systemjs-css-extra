/* globals describe, it */

'use strict';

const assert = {
    ok: function (val) {
        this.equal(!!val, true);
    },
    equal: function equal(a, b) {
        if (a !== b)
            throw new Error('Expected "' + a + '" to be "' + b + '"');
    },
    fail: function (msg) {
        throw new Error(msg);
    }
};

describe('CSS', function() {

    this.timeout(5000);

    it('should load systemjs', function(){
        assert.ok(typeof window.System === 'object');
    });

    it('should load test_1.css', function(done){
        System.import('../test/test_1.css').then(function(){
            let links = document.head.querySelectorAll('link');
            for (var i = 0; i < links.length; i++) {
                let link = links[i].getAttribute('href');
                if(link.endsWith('test/test_1.css')){
                    done();
                    return;
                }
            }
            done(new Error('css file did not load'));
        });
    });        

    it('should not load a stylesheet if it is already loaded', function(done){
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = window.location.pathname.replace('test/test.html', '')+'test/test_2.css';
        document.head.appendChild(link);
        link.onload = function(){
            System.import('../test/test_2.css').then(function(){
                done(new Error('css file loaded while it should not'));
            }).catch(function(e){
                done();
            });
        };

    });

});
