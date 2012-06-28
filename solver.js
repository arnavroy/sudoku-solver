(function() {
  ///////////////////////////
  // Utility functions.    //
  ///////////////////////////
  function crossProduct(listA, listB) {
    var res = new Array();
    _.map(listA, function(x) {
      _.each(listB, function(y) {
        res.push(x + y);
      })
    });
    return res;
  }

  function getAllColUnits(cols, rows) {
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

  function getAllRowUnits(rows, cols) {
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

  ///////////////////////////
  // Grid parsing routines.//
  ///////////////////////////
  // Parses the input grid and creates a associative array.
  // Key is the cell name and value is either a digit
  // ('0-9') / a dot ('.')
  // grid is in this form: "1.3..."
  // where . represents an empty cell.
  this.grid_values = function (grid) {
    var res = new Array();
    _.each(grid.split(''), function(c) {
      if (_.include('.123456789'.split(''), c)) {
        res.push(c);
      }
    })
    if (this.squares.length != res.length) {
      return false;
    }
    var dict = {};
    var resIndex = 0;
    _.each(this.squares, function(s) {
      dict[s] = res[resIndex];
      resIndex++;
    });
    return dict;
  }

  // Returns a grid config with each cell having all digits as
  // candidates.
  this.initValues = function() {
    var res = {};
    _.each(this.squares, function(s) {
      res[s] = this.digitsStr;
    });
    return res;
  }

  // Tries to assign values to a initial config by reading the input and
  // Constrain Propagation technique.
  this.parse_grid = function(grid) {
    values = this.initValues();
    inputGrid = this.grid_values(grid)
    if (!inputGrid) {
      return false;
    }
    _.each(inputGrid, function(val, cell) {
      if (_.include(this.digitsStr.split(''), val)) {
        // Try assigning potential values using Constraint Propagation.
        if (!this.assign(values, cell, val)) {
          return false;
        }
      }
    })
   return values;
  }

  /////////////////////////////////////
  // Constraint Propagation routines.//
  /////////////////////////////////////
  this.assign = function(values, cell, val) {
    other_values = values[cell].replace(val, '');
    for (var idx = 0; idx < other_values.split('').length; ++idx) {
      if (!this.eliminate(values, cell, other_values.split('')[idx])) {
       return false;
      }
    }
    // Elimination for all the cells succeeded!
    return values;
  }


  this.eliminate = function(values, cell, val) {
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
      for (var idx = 0; idx < this.peers[cell].length; ++idx) {
        if (!this.eliminate(values, this.peers[cell][idx], finalValue)) {
          return false;
        }
      }
    }

    // If the value to be eliminated from this cell ("val") is the only candidate 
    // for a cell, place it there.
    for (var unitsIdx = 0; unitsIdx < this.units[cell].length; ++unitsIdx) {
      var unit = this.units[cell][unitsIdx];
      var placesForVal = new Array();
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
        if (!this.assign(values, placesForVal[0], val)) {
          return false;
        }
      }
    }
    return values;
  }

  /////////////////////////////////////
  // Search routines.                //
  /////////////////////////////////////
  this.solve = function(grid) {
    return this.search(this.parse_grid(grid));
  }

  this.search = function(values) {
    if (!values) {
      return false;
    }
    // If each cell has just one value assigned then the sudoku has been solved!
    var noOp = true;
    _.each(this.squares, function(cell) {
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
    _.each(this.squares, function(cell) {
      if (values[cell].length > 1 && values[cell].length < minLen) {
        minLen = values[cell].length;
        nextCell = cell;
      }
    });

    // Try to assign the candidates to this cell one by one and
    // return true if we succeed.
    for (var idx = 0; idx < values[nextCell].split('').length; ++idx) {
      var val = values[nextCell].split('')[idx];
      var tempValues = this.assign(_.clone(values), nextCell, val);
      var soln = this.search(this.assign(_.clone(values), nextCell, val));
      if (soln) {
        return soln;
      }
    }
    return false;
  }

  /////////////////////////////
  // Driver.                ///
  /////////////////////////////
  // Takes the grid string as input.
  this.solveIt = function (grid) {
    var soln = this.solve(grid);
    // TODO: Pretty print.
    return soln;
  }

  /////////////////////////////
  // Data structures.      ////
  /////////////////////////////
  this.digitsStr = '123456789';
  var rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  var cols = this.digitsStr.split('');
  this.squares = crossProduct(rows, cols);

  this.allColUnits = getAllColUnits(cols, rows);
  this.allRowUnits = getAllRowUnits(rows, cols);
  var rowUnits = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
  var colUnits = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
  this.allSquareUnits = new Array();
  _.each(rowUnits, function(ru) {
    _.each(colUnits, function(cu) {
      this.allSquareUnits.push(crossProduct(ru, cu));
    })
  });

  this.unitList = new Array();
  _.each(this.allColUnits, function(cus) {
    this.unitList.push(cus);
  });
  _.each(this.allRowUnits, function(rus) {
    this.unitList.push(rus);
  });
  _.each(this.allSquareUnits, function(sus) {
    this.unitList.push(sus);
  });

  this.units = {};
  _.each(this.squares, function(s) {
    this.units[s] = new Array();
    _.each(this.unitList, function(u) {
      if (_.include(u, s)) {
        this.units[s].push(u);
      }
    })
  });

  this.peers = {};
  _.each(this.squares, function(s) {
    var unionUnits = new Array();
    _.each(this.units[s], function(u) {
      unionUnits = _.union(unionUnits, u);
    });
    unionUnits = _.difference(unionUnits, [s]);
    this.peers[s] = unionUnits;
  });

}).call(this);
