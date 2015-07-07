var Reflux    = require("reflux");
var _         = require("underscore");

var dist        = require("../utils/distributions.js");
var Normal      = dist.Normal;
var Truncated   = dist.Truncated;

var STEP        = 1;
var RV_DOMAIN   = { min: 0, max: 100 };
var IDENTITY    = function(x) { return x };

var DistributionStore = module.exports = Reflux.createStore({
  init: function(xMean, xSigma, yMean, ySigma) {
    this._xDist = this._buildDist(xMean, xSigma);
    this._yDist = this._buildDist(yMean, ySigma);

    this._recalculate();
  },

  _debug: function() {
    console.dir(this._xDist);
    console.dir(this._yDist);
  },

  getData: function() {
    return {
      domain: this._domain,
      ranges: {
        x: this._xRange,
        y: this._yRange,
      }
    };
  },

  update: function(toUpdate) {
    if(typeof toUpdate.xMean  !== 'undefined'
    || typeof toUpdate.xSigma !== 'undefined' ) {
      this._xDist = this._buildDist(xMean, xSigma);
      this._recalculateXRange();
    }

    if(typeof toUpdate.yMean  !== 'undefined'
    || typeof toUpdate.ySigma !== 'undefined' ) {
      this._yDist = this._buildDist(yMean, ySigma);
      this._recalculateYRange();
    }

    this.trigger(this.getData());
  },

  _recalculate: function() {
    this._recalculateDomain();
    this._recalculateXRange();
    this._recalculateYRange();
  },

  _recalculateDomain: function() {
    this._domain = []

    for(var i = RV_DOMAIN.min; i < RV_DOMAIN.max; i+= STEP) {
      this._domain.push(i);
    }
  },

  _recalculateXRange: function() {
    this._xRange = _.map(this._domain, this._xDist.pdf.bind(this._xDist));
  },

  _recalculateYRange: function() {
    this._yRange = _.map(this._domain, this._yDist.pdf.bind(this._yDist));
  },

  _buildDist: function(mean, sigma) {
    var norm = Normal(mean, sigma);
    return Truncated(RV_DOMAIN.min, RV_DOMAIN.max, norm);
  },

});
