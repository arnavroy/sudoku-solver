var should = require('should');
var util = require('../lib/util');

describe('crossProduct', function() {
    describe('with non-existent lists', function() {
        it('returns null', function() {
            var result = util.crossProduct(null, null);
            should.not.exist(result);

            result = util.crossProduct(null);
            should.not.exist(result);

            result = util.crossProduct();
            should.not.exist(result);
        });
    });
});
