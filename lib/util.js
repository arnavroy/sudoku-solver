"use strict";

var _ = require('underscore');

var util = (function() {
  function isValidArgs(arg1, arg2) {
    return !((_.isNull(arg1) || _.isUndefined(arg1) || _.isNull(arg2) ||
        _.isUndefined(arg2)));
  }

  return {
    crossProduct: function(listA, listB) {
      if (!isValidArgs(listA, listB)) {
        return null;
      }
      var res = [];
      _.map(listA, function(x) {
        _.each(listB, function(y) {
          res.push(x + y);
        });
      });
      return res;
    },

    getAllColUnits: function(cols, rows) {
      if (!isValidArgs(cols, cols)) {
        return null;
      }
      var res = [];
      _.each(cols, function(c) {
        var tempArr = [];
        _.each(rows, function(r) {
          tempArr.push(r + c); 
        });
        res.push(tempArr);
      });
      return res;
    },

    getAllRowUnits: function(rows, cols) {
      if (!isValidArgs(rows, cols)) {
        return null;
      }
      var res = [];
      _.each(rows, function(r) {
        var tempArr = [];
        _.each(cols, function(c) {
          tempArr.push(r + c);
        });
        res.push(tempArr);
      });
      return res;
    }
  };
}());

module.exports = util;
