var should = require('should');
var sudoku = require('../lib/main').sudoku;

describe('solve', function() {
    describe('with empty grid', function() {
        it('returns sequential grid', function() {
            // 81 dots.
            var emptyGrid = '..............................................' +
                            '...................................';
            var result = sudoku.solve(emptyGrid);
            // This should be a sequentially solved grid.
            should.not.exist(result);
        });
    });
});
