var should = require('should');
var sudoku = require('../lib/main');

describe('solve', function() {
  describe('with empty grid', function() {
    it('returns sequential grid', function() {
      // 81 dots.
      var emptyGrid = '..............................................' +
                      '...................................';
      var result = sudoku.solve(emptyGrid);
      // This should be a sequentially solved grid.
      var expectedResult =
        {"A1":"1","A2":"2","A3":"3","A4":"4","A5":"5","A6":"6","A7":"7",
         "A8":"8","A9":"9","B1":"4","B2":"5","B3":"6","B4":"7","B5":"8",
         "B6":"9","B7":"1","B8":"2","B9":"3","C1":"7","C2":"8","C3":"9",
         "C4":"1","C5":"2","C6":"3","C7":"4","C8":"5","C9":"6","D1":"2",
         "D2":"3","D3":"1","D4":"6","D5":"7","D6":"4","D7":"8","D8":"9",
         "D9":"5","E1":"8","E2":"7","E3":"5","E4":"9","E5":"1","E6":"2",
         "E7":"3","E8":"6","E9":"4","F1":"6","F2":"9","F3":"4","F4":"5",
         "F5":"3","F6":"8","F7":"2","F8":"1","F9":"7","G1":"3","G2":"1",
         "G3":"7","G4":"2","G5":"6","G6":"5","G7":"9","G8":"4","G9":"8",
         "H1":"5","H2":"4","H3":"2","H4":"8","H5":"9","H6":"7","H7":"6",
         "H8":"3","H9":"1","I1":"9","I2":"6","I3":"8","I4":"3","I5":"4",
         "I6":"1","I7":"5","I8":"7","I9":"2"};
      result.should.eql(expectedResult);
    });
  });

  describe('with easy grid', function() {
    it('returns solution', function() {
      var randomGrid = '85...24..72......9..4.........1.7..23.5...9...4....' +
                       '.......8..7..17..........36.4.';
      var result = sudoku.solve(randomGrid);
      var expectedResult =
        {"A1":"8","A2":"5","A3":"9","A4":"6","A5":"1","A6":"2","A7":"4",
         "A8":"3","A9":"7","B1":"7","B2":"2","B3":"3","B4":"8","B5":"5",
         "B6":"4","B7":"1","B8":"6","B9":"9","C1":"1","C2":"6","C3":"4",
         "C4":"3","C5":"7","C6":"9","C7":"5","C8":"2","C9":"8","D1":"9",
         "D2":"8","D3":"6","D4":"1","D5":"4","D6":"7","D7":"3","D8":"5",
         "D9":"2","E1":"3","E2":"7","E3":"5","E4":"2","E5":"6","E6":"8",
         "E7":"9","E8":"1","E9":"4","F1":"2","F2":"4","F3":"1","F4":"5",
         "F5":"9","F6":"3","F7":"7","F8":"8","F9":"6","G1":"4","G2":"3",
         "G3":"2","G4":"9","G5":"8","G6":"1","G7":"6","G8":"7","G9":"5",
         "H1":"6","H2":"1","H3":"7","H4":"4","H5":"2","H6":"5","H7":"8",
         "H8":"9","H9":"3","I1":"5","I2":"9","I3":"8","I4":"7","I5":"3",
         "I6":"6","I7":"2","I8":"4","I9":"1"};
      result.should.eql(expectedResult);
    });
  });

  describe('with invalid grid', function() {
    it('returns false', function() {
      // Insufficient slots.
      var result = sudoku.solve('..');
      result.should.not.be.ok;

      // 0 is invalid.
      var randomGridWithZero = '80...24..72......9..4.........1.7..23.5...' +
                               '9...4...........8..7..17..........36.4.';
      result = sudoku.solve(randomGridWithZero);
      result.should.not.be.ok;

      // Same number in a peers is invalid.
      // Here 2 appears twice in the same row.
      var randomGridWithSameValuePeers = '82...24..72......9..4.........1.7' +
        '..23.5...9...4...........8..7..17..........36.4.';
      result = sudoku.solve(randomGridWithZero);
      result.should.not.be.ok;
    });
  });
});
