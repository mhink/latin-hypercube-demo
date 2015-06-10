var Reflux    = require("reflux");
var d3        = require("d3");

var dist      = require("../utils/distributions.js");
var Normal    = dist.Normal;
var Truncated = dist.Truncated;

var STEP      = 0.1;
var RV_DOMAIN    = { min: 0, max: 100 };

var DistributionStore = module.exports = Reflux.createStore({
  init: function(x_params, y_params) {
    this.x = x_params || {
      mean:     80,
      stdev:    12,
    };
    this.y = y_params || {
      mean:     55,
      stdev:    10,
    };
  },

  data: function() {
    return {
      x: this.generateData(Normal(this.x.mean, this.x.stdev)),
      y: this.generateData(Normal(this.y.mean, this.y.stdev)),
    };
  },

  domains: function() {
    return {
      x: { i: [RV_DOMAIN.min, RV_DOMAIN.max], pi: [0, 1]},
      y: { i: [RV_DOMAIN.min, RV_DOMAIN.max], pi: [0, 1]},
    };
  },

  generateData: function(dist) {
    var tdist = Truncated(RV_DOMAIN.min, RV_DOMAIN.max, dist);
    data = [];
    for(var m = 0, i = RV_DOMAIN.min; i < RV_DOMAIN.max; m++, i += STEP) {
      data[m] = {id: m, i: i, pi: dist.pdf(i)};
    }
    return data;
  },

  xMean: function() {
    return this.x.mean;
  },

  updateXMean: function(x_mean) {
    this.x.mean = parseInt(x_mean);
    this.trigger({
      mean: this.x.mean,
      data: this.data().x 
    });
  },

  updateXStdev: function(x_stdev) {
    this.x.stdev = x_stdev;
    this.trigger({
      data:        this.xData()
    });
  },

  updateYMean: function(y_mean) {
    this.y.mean = y_mean;
    this.trigger({
      datasetName: 'yData',
      data:        this.yData()
    });
  },

  updateYStdev: function(y_stdev) {
    this.y.stdev = y_stdev;
    this.trigger({
      datasetName: 'yData',
      data:        this.yData()
    });
  },

});
