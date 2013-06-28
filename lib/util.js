var _ = require('underscore')

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
};
module.exports = util;
