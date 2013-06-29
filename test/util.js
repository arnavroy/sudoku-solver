"use strict";

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

  describe('with valid lists', function() {
    it('returns cross lists', function() {
      var result = util.crossProduct([1, 2], ['a', 'b']);
      result.should.eql(['1a', '1b', '2a', '2b']);
    });
  });
});

describe('getAllColUnits', function() {
  describe('with non-existent lists', function() {
    it('returns null', function() {
      var result = util.getAllColUnits(null, null);
      should.not.exist(result);

      result = util.getAllColUnits(null);
      should.not.exist(result);

      result = util.getAllColUnits();
      should.not.exist(result);
    });
  });

  describe('with valid lists', function() {
    it('returns col units', function() {
      var result = util.getAllColUnits([1, 2], ['a', 'b']);
      result.should.eql([['a1', 'b1'], ['a2', 'b2']]);
    });
  });
});

describe('getAllRowUnits', function() {
  describe('with non-existent lists', function() {
    it('returns null', function() {
      var result = util.getAllRowUnits(null, null);
      should.not.exist(result);

      result = util.getAllRowUnits(null);
      should.not.exist(result);

      result = util.getAllRowUnits();
      should.not.exist(result);
    });
  });

  describe('with valid lists', function() {
    it('returns row units', function() {
      var result = util.getAllRowUnits(['a', 'b'], [1, 2]);
      result.should.eql([['a1', 'a2'], ['b1', 'b2']]);
    });
  });
});
