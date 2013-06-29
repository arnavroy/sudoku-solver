"use strict";

var _ = require('underscore');
var util = require('./util.js');
var grid = require('./grid.js');

var sudoku = (function() {
  var gridValues = function (gridInput) {
    var res = [];
    _.each(gridInput.split(''), function(c) {
      // JS Lint complains if we split a string literal, so using the
      // String prototype.
      if (_.include(String.prototype.split.call('.123456789', ''), c)) {
        res.push(c);
      }
    });
    if (grid.squares.length !== res.length) {
      return false;
    }
    var dict = {};
    var resIndex = 0;
    _.each(grid.squares, function(s) {
      dict[s] = res[resIndex];
      resIndex++;
    });
    return dict;
  };

  // Returns a grid config with each cell having all digits as
  // candidates.
  var initValues = function() {
    var res = {};
    _.each(grid.squares, function(s) {
      res[s] = grid.digitsStr;
    });
    return res;
  };

  // Tries to assign values to a initial config by reading the input and
  // Constrain Propagation technique.
  var parseGrid = function(gridInput) {
    var values = initValues();
    var inputGrid = gridValues(gridInput);
    if (!inputGrid) {
      return false;
    }
    _.each(inputGrid, function(val, cell) {
      if (_.include(grid.digitsStr.split(''), val)) {
        // Try assigning potential values using Constraint Propagation.
        if (!assign(values, cell, val)) {
          return false;
        }
      }
    });
   return values;
  };

  /////////////////////////////////////
  // Constraint Propagation routines.//
  /////////////////////////////////////
  var assign = function(values, cell, val) {
    var other_values = values[cell].replace(val, '');
    for (var idx = 0; idx < other_values.split('').length; ++idx) {
      if (!eliminate(values, cell, other_values.split('')[idx])) {
       return false;
      }
    }
    // Elimination for all the cells succeeded!
    return values;
  };


  var eliminate = function(values, cell, val) {
    if (!(_.include(values[cell].split(''), val))) {
      // Value already eliminated.
      return values;
    }

    // Eliminate the value.
    values[cell] = values[cell].replace(val, '');

    if (values[cell].length == 0) {
      // We eliminated the last value from the cell, error!
      return false;
    } else if (values[cell].length == 1) {
      // If the cell has just 1 candidate value(the final value) then eliminate that value
      // from peers.
      var finalValue = values[cell];
      for (var idx = 0; idx < grid.peers[cell].length; ++idx) {
        if (!eliminate(values, grid.peers[cell][idx], finalValue)) {
          return false;
        }
      }
    }

    // If the value to be eliminated from this cell ("val") is the only candidate 
    // for a cell, place it there.
    for (var unitsIdx = 0; unitsIdx < grid.units[cell].length; ++unitsIdx) {
      var unit = grid.units[cell][unitsIdx];
      var placesForVal = [];
      for (var unitIdx = 0; unitIdx < unit.length; ++unitIdx) {
        var otherCell = unit[unitIdx];
        if (_.include(values[otherCell].split(''), val))  {
          placesForVal.push(otherCell);
        }
      }
      if (placesForVal.length == 0) {
        // No cell has this val as a candidate, error!
        return false;
      } else if (placesForVal.length == 1) {
        // There's a  single cell which has this value as a candidate.
        // Try to place it there.
        if (!assign(values, placesForVal[0], val)) {
          return false;
        }
      }
    }
    return values;
  };

  /////////////////////////////////////
  // Search routines.                //
  /////////////////////////////////////
  var solve = function(gridInput) {
    return search(parseGrid(gridInput));
  };

  var search = function(values) {
    if (!values) {
      return false;
    }
    // If each cell has just one value assigned then the sudoku has been solved!
    var noOp = true;
    _.each(grid.squares, function(cell) {
      if (values[cell].length != 1) {
        noOp = false;
      }
    });
    if (noOp == true) {
      return values;
    }
    // Choose the cell with minimum candidates.
    var minLen = 10; // A large val for min len init.
    var nextCell = '';
    _.each(grid.squares, function(cell) {
      if (values[cell].length > 1 && values[cell].length < minLen) {
        minLen = values[cell].length;
        nextCell = cell;
      }
    });

    // Try to assign the candidates to this cell one by one and
    // return true if we succeed.
    for (var idx = 0; idx < values[nextCell].split('').length; ++idx) {
      var val = values[nextCell].split('')[idx];
      var tempValues = assign(_.clone(values), nextCell, val);
      var soln = search(assign(_.clone(values), nextCell, val));
      if (soln) {
        return soln;
      }
    }
    return false;
  };
  return {
    solve: solve
  };
}());

module.exports = sudoku;
