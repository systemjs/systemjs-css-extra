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

    it('should have systemjs loaded', function(){
        assert.ok(typeof window.System === 'object');
    });

    it('should load test.css', function(done){
        System.import('../test/test.css').then(function(){
            done();
        });
    });        

    /*
    it('width should be equal to 801', function() {
        assert.equal(801, window.innerWidth);
    });

    it('height should be equal to 501', function() {
        assert.equal(501, window.innerHeight);
    });
    */

});
