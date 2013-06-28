"use strict";

var _ = require('underscore');

var util = {
  crossProduct: function(listA, listB) {
    if (_.isNull(listA) || _.isUndefined(listA) || _.isNull(listB) ||
        _.isUndefined(listB)) {
      return null;
    }
    var res = new Array();
    _.map(listA, function(x) {
      _.each(listB, function(y) {
        res.push(x + y);
      })
    });
    return res;
  }

  getAllColUnits: function(cols, rows) {
    var res = new Array();
    _.each(cols, function(c) {
      var tempArr = new Array();
      _.each(rows, function(r) {
        tempArr.push(r + c); 
      })
      res.push(tempArr);
    });
    return res;
  }

  getAllRowUnits: function(rows, cols) {
    var res = new Array();
    _.each(rows, function(r) {
      var tempArr = new Array();
      _.each(cols, function(c) {
        tempArr.push(r + c);
      })
      res.push(tempArr);
    });
    return res;
  }
};

module.exports = util;
