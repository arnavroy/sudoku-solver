// Exporting for both node.js and browser.
// More info: http://caolanmcmahon.com/posts/writing_for_node_and_the_browser/
(function (exports) {
  exports.sudoku = {
    solve: function() {
      return null;
    }
  };
})(typeof exports === 'undefined' ? this['sudoku'] = {} : exports);
