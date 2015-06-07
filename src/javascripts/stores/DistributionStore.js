var Reflux    = require("reflux");
var dist      = require("../utils/distributions.js");

var Normal    = dist.Normal;
var Truncated = dist.Truncated;
var Pareto    = dist.Pareto;

var STEP      = 0.1;
var RANGE     = { min: 0.01, max: 100 };

/* DistributionStore
 *
 * Stores parameters for the two main distributions on the page:
 * a normal distribution and a Beta distribution.
 *
 * Both of these are clipped to the domain (0..100).  The store
 * is responsible for sampling them and providing the points
 * to page components (to be rendered by d3).
 */
var DistributionStore = module.exports = Reflux.createStore({
  init: function(x_params, y_params) {
    this.x = x_params || {
      mean:     80,
      stdev: 12,
    };
    this.y = y_params || {
      mean:     55,
      stdev:    10,
    };
  },

  xData: function() { 
    return this.generateData(Normal(this.x.mean, this.x.stdev));
  },

  yData: function() {
    return this.generateData(Pareto(this.y.alpha, RANGE.min));
  },

  generateData: function(dist) {
    var tdist = Truncated(RANGE.min, RANGE.max, dist);
    data = [];
    for(var i = 0, x = RANGE.min; x < RANGE.max; i++, x += STEP) {
      data[i] = [x, dist.pdf(x)];
    }
    return data;
  },
});
