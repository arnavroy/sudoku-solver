"use strict";

var _ = require('underscore');
var util = require('./util');

var grid = (function() {
  var digitsStr = '123456789';
  var rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  var cols = digitsStr.split('');
  var squares = util.crossProduct(rows, cols);

  var allColUnits = util.getAllColUnits(cols, rows);
  var allRowUnits = util.getAllRowUnits(rows, cols);

  var rowUnits = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
  var colUnits = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];

  var allSquareUnits =[];
  _.each(rowUnits, function(ru) {
    _.each(colUnits, function(cu) {
      allSquareUnits.push(util.crossProduct(ru, cu));
    });
  });

  var unitList = [];
  _.each(allColUnits, function(cus) {
    unitList.push(cus);
  });
  _.each(allRowUnits, function(rus) {
    unitList.push(rus);
  });
  _.each(allSquareUnits, function(sus) {
    unitList.push(sus);
  });

  var units = {};
  _.each(squares, function(s) {
    units[s] = []; 
    _.each(unitList, function(u) {
      if (_.include(u, s)) {
        units[s].push(u);
      }
    });
  });

  var peers = {};
  _.each(squares, function(s) {
    var unionUnits = [];
    _.each(units[s], function(u) {
      unionUnits = _.union(unionUnits, u);
    });
    unionUnits = _.difference(unionUnits, [s]);
    peers[s] = unionUnits;
  });

  return {
    digitsStr: digitsStr,
    squares: squares,
    allColUnits: allColUnits,
    allRowUnits: allRowUnits,
    allSquareUnits: allSquareUnits,
    unitList: unitList,
    units: units,
    peers: peers
  };
}());

module.exports = grid;
